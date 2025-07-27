<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';
require_once '../../includes/functions.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate authentication token
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(['error' => 'Authorization token required']);
    exit;
}

$token = $matches[1];
if (!validateAdminToken($token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid or expired token']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON format']);
    exit;
}

// Validate required fields
$requiredFields = ['title', 'category', 'introduction', 'items', 'comparison_table', 'seo_metadata'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Validate items structure
if (!is_array($data['items']) || count($data['items']) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'At least 2 items required for comparison']);
    exit;
}

// Validate comparison table
if (!is_array($data['comparison_table']) || count($data['comparison_table']) < 3) {
    http_response_code(400);
    echo json_encode(['error' => 'At least 3 comparison features required']);
    exit;
}

// Validate SEO metadata
$seo = $data['seo_metadata'];
if (!isset($seo['meta_title']) || !isset($seo['meta_description']) || !isset($seo['keywords'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Complete SEO metadata required (meta_title, meta_description, keywords)']);
    exit;
}

try {
    $pdo->beginTransaction();
    
    // Create or get category
    $categoryPath = $data['category'];
    $categoryParts = explode(' > ', $categoryPath);
    $categoryName = end($categoryParts);
    $categorySlug = generateSlug($categoryName);
    
    $stmt = $pdo->prepare("SELECT id FROM categories WHERE slug = ?");
    $stmt->execute([$categorySlug]);
    $category = $stmt->fetch();
    
    if (!$category) {
        // Create new category
        $icon = getCategoryIcon($categoryName);
        $stmt = $pdo->prepare("
            INSERT INTO categories (name, slug, icon, description) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([
            $categoryName,
            $categorySlug,
            $icon,
            "Comparisons in the $categoryName category"
        ]);
        $categoryId = $pdo->lastInsertId();
    } else {
        $categoryId = $category['id'];
    }
    
    // Create comparison
    $comparisonSlug = generateSlug($data['title']);
    
    // Check if comparison already exists
    $stmt = $pdo->prepare("SELECT id FROM comparisons WHERE slug = ?");
    $stmt->execute([$comparisonSlug]);
    if ($stmt->fetch()) {
        $comparisonSlug .= '-' . time(); // Add timestamp to make unique
    }
    
    $featuredImage = isset($data['items'][0]['image']) ? $data['items'][0]['image'] : null;
    $featured = isset($data['featured']) ? (bool)$data['featured'] : false;
    
    $stmt = $pdo->prepare("
        INSERT INTO comparisons (
            title, slug, category_id, category_path, introduction, 
            featured_image, featured, meta_title, meta_description, keywords, disclaimer
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $data['title'],
        $comparisonSlug,
        $categoryId,
        $categoryPath,
        $data['introduction'],
        $featuredImage,
        $featured,
        $seo['meta_title'],
        $seo['meta_description'],
        json_encode($seo['keywords']),
        $data['disclaimer'] ?? null
    ]);
    $comparisonId = $pdo->lastInsertId();
    
    // Insert comparison items
    foreach ($data['items'] as $index => $item) {
        $stmt = $pdo->prepare("
            INSERT INTO comparison_items (
                comparison_id, name, description, image, specifications, display_order
            ) VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $comparisonId,
            $item['name'],
            $item['description'],
            $item['image'] ?? null,
            json_encode($item['specifications'] ?? []),
            $index
        ]);
    }
    
    // Insert comparison features
    foreach ($data['comparison_table'] as $index => $feature) {
        $stmt = $pdo->prepare("
            INSERT INTO comparison_features (
                comparison_id, feature_name, feature_values, display_order
            ) VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([
            $comparisonId,
            $feature['feature'],
            json_encode($feature['values']),
            $index
        ]);
    }
    
    // Insert media if provided
    if (isset($data['media'])) {
        if (isset($data['media']['images'])) {
            foreach ($data['media']['images'] as $index => $imageUrl) {
                $stmt = $pdo->prepare("
                    INSERT INTO comparison_media (comparison_id, type, url, display_order)
                    VALUES (?, 'image', ?, ?)
                ");
                $stmt->execute([$comparisonId, $imageUrl, $index]);
            }
        }
        
        if (isset($data['media']['videos'])) {
            foreach ($data['media']['videos'] as $index => $videoUrl) {
                $stmt = $pdo->prepare("
                    INSERT INTO comparison_media (comparison_id, type, url, display_order)
                    VALUES (?, 'video', ?, ?)
                ");
                $stmt->execute([$comparisonId, $videoUrl, $index]);
            }
        }
    }
    
    // Generate static HTML page
    $staticPagePath = generateStaticPage($comparisonId, $pdo);
    
    // Record static page generation
    $stmt = $pdo->prepare("
        INSERT INTO static_pages (comparison_id, file_path)
        VALUES (?, ?)
    ");
    $stmt->execute([$comparisonId, $staticPagePath]);
    
    $pdo->commit();
    
    // Update robots.txt and sitemap
    updateRobotsTxt();
    updateSitemap();
    
    // Log the import
    logActivity("Comparison imported: {$data['title']} (ID: $comparisonId)");
    
    echo json_encode([
        'success' => true,
        'comparison_id' => $comparisonId,
        'slug' => $comparisonSlug,
        'static_page' => $staticPagePath,
        'message' => 'Comparison imported successfully'
    ]);
    
} catch (Exception $e) {
    $pdo->rollBack();
    logActivity("Import failed: " . $e->getMessage(), 'ERROR');
    
    http_response_code(500);
    echo json_encode(['error' => 'Import failed: ' . $e->getMessage()]);
}

function getCategoryIcon($categoryName) {
    $iconMap = [
        'software' => 'fas fa-laptop',
        'electronics' => 'fas fa-mobile-alt',
        'appliances' => 'fas fa-home',
        'automotive' => 'fas fa-car',
        'smartphones' => 'fas fa-mobile-alt',
        'laptops' => 'fas fa-laptop',
        'headphones' => 'fas fa-headphones',
        'tablets' => 'fas fa-tablet-alt',
        'gaming' => 'fas fa-gamepad',
        'kitchen' => 'fas fa-utensils',
        'cleaning' => 'fas fa-broom',
    ];
    
    $category = strtolower($categoryName);
    
    foreach ($iconMap as $key => $icon) {
        if (strpos($category, $key) !== false) {
            return $icon;
        }
    }
    
    return 'fas fa-folder';
}

function generateStaticPage($comparisonId, $pdo) {
    // Get comparison data
    $stmt = $pdo->prepare("
        SELECT c.*, cat.name as category_name 
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        WHERE c.id = ?
    ");
    $stmt->execute([$comparisonId]);
    $comparison = $stmt->fetch();
    
    if (!$comparison) {
        throw new Exception("Comparison not found");
    }
    
    // Get items
    $items = getComparisonItems($pdo, $comparisonId);
    
    // Get features
    $features = getComparisonFeatures($pdo, $comparisonId);
    
    // Get media
    $media = getComparisonMedia($pdo, $comparisonId);
    
    // Load template
    $template = file_get_contents(__DIR__ . '/../../templates/comparison_template.html');
    
    // Replace template variables
    $replacements = [
        '{{TITLE}}' => htmlspecialchars($comparison['title']),
        '{{META_TITLE}}' => htmlspecialchars($comparison['meta_title']),
        '{{META_DESCRIPTION}}' => htmlspecialchars($comparison['meta_description']),
        '{{KEYWORDS}}' => implode(', ', json_decode($comparison['keywords'], true)),
        '{{INTRODUCTION}}' => htmlspecialchars($comparison['introduction']),
        '{{CANONICAL_URL}}' => "https://" . $_SERVER['HTTP_HOST'] . "/comparison/" . $comparison['slug'],
        '{{UPDATED_DATE}}' => date('M j, Y', strtotime($comparison['updated_at'])),
        '{{CATEGORY_NAME}}' => htmlspecialchars($comparison['category_name']),
        '{{DATE_PUBLISHED}}' => date('c', strtotime($comparison['created_at'])),
        '{{DATE_MODIFIED}}' => date('c', strtotime($comparison['updated_at'])),
        '{{SITE_URL}}' => "https://" . $_SERVER['HTTP_HOST'],
        '{{HEADER_INCLUDE}}' => '', // Will be included dynamically
        '{{FOOTER_INCLUDE}}' => '', // Will be included dynamically
    ];
    
    // Handle featured image
    if ($comparison['featured_image']) {
        $template = str_replace('{{#FEATURED_IMAGE}}', '', $template);
        $template = str_replace('{{/FEATURED_IMAGE}}', '', $template);
        $replacements['{{FEATURED_IMAGE}}'] = $comparison['featured_image'];
    } else {
        $template = preg_replace('/{{#FEATURED_IMAGE}}.*?{{\/FEATURED_IMAGE}}/s', '', $template);
    }
    
    // Handle disclaimer
    if ($comparison['disclaimer']) {
        $template = str_replace('{{#DISCLAIMER}}', '', $template);
        $template = str_replace('{{/DISCLAIMER}}', '', $template);
        $replacements['{{DISCLAIMER}}'] = htmlspecialchars($comparison['disclaimer']);
    } else {
        $template = preg_replace('/{{#DISCLAIMER}}.*?{{\/DISCLAIMER}}/s', '', $template);
    }
    
    // Process items and comparison table (simplified version)
    // In a full implementation, you would process all the Mustache-style loops
    // For now, generate a basic version
    
    // Apply replacements
    foreach ($replacements as $placeholder => $value) {
        $template = str_replace($placeholder, $value, $template);
    }
    
    // Ensure static directory exists
    $staticDir = __DIR__ . '/../../static/comparison';
    if (!is_dir($staticDir)) {
        mkdir($staticDir, 0755, true);
    }
    
    // Save static file
    $filename = $comparison['slug'] . '.html';
    $filepath = $staticDir . '/' . $filename;
    file_put_contents($filepath, $template);
    
    return '/static/comparison/' . $filename;
}
?>