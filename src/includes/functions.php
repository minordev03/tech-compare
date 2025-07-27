<?php
// Core functions for Tech-Compare

function getCurrentUrl() {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $uri = $_SERVER['REQUEST_URI'];
    return $protocol . '://' . $host . $uri;
}

function generateSlug($text) {
    // Convert to lowercase and replace spaces/special chars with hyphens
    $slug = strtolower(trim($text));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}

function getCategories($pdo) {
    $stmt = $pdo->query("
        SELECT id, name, slug, icon, comparison_count 
        FROM categories 
        WHERE comparison_count > 0 
        ORDER BY name
    ");
    return $stmt->fetchAll();
}

function getFeaturedComparisons($pdo, $limit = 6) {
    $limit = (int)$limit;
    $stmt = $pdo->query("
        SELECT c.*, cat.name as category_name 
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        WHERE c.featured = TRUE 
        ORDER BY c.updated_at DESC 
        LIMIT $limit
    ");
    return $stmt->fetchAll();
}

function getRecentComparisons($pdo, $limit = 5) {
    $limit = (int)$limit;
    $stmt = $pdo->query("
        SELECT c.*, cat.name as category_name 
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        ORDER BY c.updated_at DESC 
        LIMIT $limit
    ");
    return $stmt->fetchAll();
}

function getComparisonBySlug($pdo, $slug) {
    $stmt = $pdo->prepare("
        SELECT c.*, cat.name as category_name 
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        WHERE c.slug = ?
    ");
    $stmt->execute([$slug]);
    return $stmt->fetch();
}

function getComparisonItems($pdo, $comparisonId) {
    $stmt = $pdo->prepare("
        SELECT * FROM comparison_items 
        WHERE comparison_id = ? 
        ORDER BY display_order, id
    ");
    $stmt->execute([$comparisonId]);
    return $stmt->fetchAll();
}

function getComparisonFeatures($pdo, $comparisonId) {
    $stmt = $pdo->prepare("
        SELECT * FROM comparison_features 
        WHERE comparison_id = ? 
        ORDER BY display_order, id
    ");
    $stmt->execute([$comparisonId]);
    return $stmt->fetchAll();
}

function getComparisonMedia($pdo, $comparisonId) {
    $stmt = $pdo->prepare("
        SELECT * FROM comparison_media 
        WHERE comparison_id = ? 
        ORDER BY display_order, id
    ");
    $stmt->execute([$comparisonId]);
    return $stmt->fetchAll();
}

function getComparisonsByCategory($pdo, $categorySlug, $limit = null) {
    $sql = "
        SELECT c.*, cat.name as category_name 
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        WHERE cat.slug = ? 
        ORDER BY c.updated_at DESC
    ";
    if ($limit) {
        $limit = (int)$limit;
        $sql .= " LIMIT $limit";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$categorySlug]);
    } else {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$categorySlug]);
    }
    return $stmt->fetchAll();
}

function getCategoryBySlug($pdo, $slug) {
    $stmt = $pdo->prepare("SELECT * FROM categories WHERE slug = ?");
    $stmt->execute([$slug]);
    return $stmt->fetch();
}

function searchComparisons($pdo, $query, $limit = 20) {
    $searchTerm = '%' . $query . '%';
    $limit = (int)$limit;
    $stmt = $pdo->prepare("
        SELECT c.*, cat.name as category_name,
               CASE 
                   WHEN c.title LIKE ? THEN 10
                   WHEN cat.name LIKE ? THEN 5
                   WHEN c.introduction LIKE ? THEN 3
                   ELSE 1
               END as relevance
        FROM comparisons c 
        JOIN categories cat ON c.category_id = cat.id 
        WHERE c.title LIKE ? 
           OR cat.name LIKE ? 
           OR c.introduction LIKE ?
           OR c.category_path LIKE ?
        ORDER BY relevance DESC, c.updated_at DESC
        LIMIT $limit
    ");
    $stmt->execute([
        $searchTerm, $searchTerm, $searchTerm, // for relevance calculation
        $searchTerm, $searchTerm, $searchTerm, $searchTerm // for WHERE clause
    ]);
    return $stmt->fetchAll();
}

function validateAdminToken($token) {
    global $pdo;
    $tokenHash = hash('sha256', $token);
    
    $stmt = $pdo->prepare("
        SELECT id FROM admin_tokens 
        WHERE token_hash = ? 
        AND (expires_at IS NULL OR expires_at > NOW())
    ");
    $stmt->execute([$tokenHash]);
    
    if ($stmt->fetch()) {
        // Update last used timestamp
        $updateStmt = $pdo->prepare("UPDATE admin_tokens SET last_used = NOW() WHERE token_hash = ?");
        $updateStmt->execute([$tokenHash]);
        return true;
    }
    
    return false;
}

function updateRobotsTxt() {
    global $pdo;
    
    // Get all comparison URLs
    $stmt = $pdo->query("SELECT slug FROM comparisons ORDER BY slug");
    $comparisons = $stmt->fetchAll();
    
    // Get all category URLs
    $stmt = $pdo->query("SELECT slug FROM categories WHERE comparison_count > 0 ORDER BY slug");
    $categories = $stmt->fetchAll();
    
    $robotsContent = "User-agent: *\n";
    $robotsContent .= "Allow: /\n";
    $robotsContent .= "Disallow: /admin/\n";
    $robotsContent .= "Disallow: /api/\n\n";
    
    $robotsContent .= "Sitemap: " . getCurrentDomain() . "/sitemap.xml\n\n";
    
    // Add all comparison pages
    foreach ($comparisons as $comparison) {
        $robotsContent .= "Allow: /comparison/" . $comparison['slug'] . "\n";
    }
    
    // Add all category pages
    foreach ($categories as $category) {
        $robotsContent .= "Allow: /category/" . $category['slug'] . "\n";
    }
    
    file_put_contents(__DIR__ . '/../robots.txt', $robotsContent);
}

function updateSitemap() {
    global $pdo;
    
    $domain = getCurrentDomain();
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    // Homepage
    $sitemap .= "  <url>\n";
    $sitemap .= "    <loc>$domain/</loc>\n";
    $sitemap .= "    <changefreq>daily</changefreq>\n";
    $sitemap .= "    <priority>1.0</priority>\n";
    $sitemap .= "  </url>\n";
    
    // Categories
    $stmt = $pdo->query("SELECT slug, updated_at FROM categories WHERE comparison_count > 0");
    while ($category = $stmt->fetch()) {
        $sitemap .= "  <url>\n";
        $sitemap .= "    <loc>$domain/category/" . $category['slug'] . "</loc>\n";
        $sitemap .= "    <lastmod>" . date('Y-m-d', strtotime($category['updated_at'])) . "</lastmod>\n";
        $sitemap .= "    <changefreq>weekly</changefreq>\n";
        $sitemap .= "    <priority>0.8</priority>\n";
        $sitemap .= "  </url>\n";
    }
    
    // Comparisons
    $stmt = $pdo->query("SELECT slug, updated_at FROM comparisons");
    while ($comparison = $stmt->fetch()) {
        $sitemap .= "  <url>\n";
        $sitemap .= "    <loc>$domain/comparison/" . $comparison['slug'] . "</loc>\n";
        $sitemap .= "    <lastmod>" . date('Y-m-d', strtotime($comparison['updated_at'])) . "</lastmod>\n";
        $sitemap .= "    <changefreq>monthly</changefreq>\n";
        $sitemap .= "    <priority>0.9</priority>\n";
        $sitemap .= "  </url>\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(__DIR__ . '/../sitemap.xml', $sitemap);
}

function getCurrentDomain() {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $protocol . '://' . $host;
}

function logActivity($message, $level = 'INFO') {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message\n";
    file_put_contents(__DIR__ . '/../logs/activity.log', $logEntry, FILE_APPEND | LOCK_EX);
}
?>