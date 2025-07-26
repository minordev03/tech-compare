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

try {
    // Update robots.txt with all current pages
    updateRobotsTxt();
    
    // Update sitemap.xml
    updateSitemap();
    
    // Get updated statistics
    $stmt = $pdo->query("SELECT COUNT(*) as total_comparisons FROM comparisons");
    $totalComparisons = $stmt->fetch()['total_comparisons'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as total_categories FROM categories WHERE comparison_count > 0");
    $totalCategories = $stmt->fetch()['total_categories'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as featured_comparisons FROM comparisons WHERE featured = TRUE");
    $featuredComparisons = $stmt->fetch()['featured_comparisons'];
    
    // Log the update
    logActivity("Homepage and navigation updated via admin API");
    
    echo json_encode([
        'success' => true,
        'message' => 'Homepage and navigation updated successfully',
        'statistics' => [
            'total_comparisons' => $totalComparisons,
            'total_categories' => $totalCategories,
            'featured_comparisons' => $featuredComparisons
        ],
        'updated_files' => [
            'robots.txt',
            'sitemap.xml'
        ]
    ]);
    
} catch (Exception $e) {
    logActivity("Homepage update failed: " . $e->getMessage(), 'ERROR');
    
    http_response_code(500);
    echo json_encode(['error' => 'Update failed: ' . $e->getMessage()]);
}
?>