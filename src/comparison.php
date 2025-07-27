<?php
require_once 'config/database.php';
require_once 'includes/functions.php';

// Get comparison slug from URL
$slug = $_GET['slug'] ?? '';

if (empty($slug)) {
    header('HTTP/1.0 404 Not Found');
    include '404.php';
    exit;
}

// Get comparison data
$comparison = getComparisonBySlug($pdo, $slug);

if (!$comparison) {
    header('HTTP/1.0 404 Not Found');
    include '404.php';
    exit;
}

// Get related data
$items = getComparisonItems($pdo, $comparison['id']);
$features = getComparisonFeatures($pdo, $comparison['id']);
$media = getComparisonMedia($pdo, $comparison['id']);
$categories = getCategories($pdo);

// Parse category path for breadcrumb
$categoryParts = explode(' > ', $comparison['category_path']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($comparison['meta_title']); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($comparison['meta_description']); ?>">
    <?php if ($comparison['keywords']): ?>
    <meta name="keywords" content="<?php echo htmlspecialchars(implode(', ', json_decode($comparison['keywords'], true))); ?>">
    <?php endif; ?>
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="<?php echo htmlspecialchars($comparison['meta_title']); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($comparison['meta_description']); ?>">
    <meta property="og:type" content="article">
    <meta property="og:url" content="<?php echo getCurrentUrl(); ?>">
    <?php if ($comparison['featured_image']): ?>
    <meta property="og:image" content="<?php echo htmlspecialchars($comparison['featured_image']); ?>">
    <?php endif; ?>
    
    <link rel="canonical" href="<?php echo getCurrentUrl(); ?>">
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "<?php echo addslashes($comparison['title']); ?>",
        "description": "<?php echo addslashes($comparison['meta_description']); ?>",
        "url": "<?php echo getCurrentUrl(); ?>",
        "datePublished": "<?php echo date('c', strtotime($comparison['created_at'])); ?>",
        "dateModified": "<?php echo date('c', strtotime($comparison['updated_at'])); ?>",
        "author": {
            "@type": "Organization",
            "name": "Tech-Compare"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Tech-Compare",
            "logo": {
                "@type": "ImageObject",
                "url": "<?php echo getCurrentDomain(); ?>/assets/images/logo.png"
            }
        }<?php if ($comparison['featured_image']): ?>,
        "image": "<?php echo addslashes($comparison['featured_image']); ?>"<?php endif; ?>
    }
    </script>
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <main class="main-content comparison-page">
        <div class="container">
            <div class="content-grid">
                <!-- Left Ad Zone -->
                <aside class="ad-sidebar">
                    <div class="ad-zone sticky-ad" data-size="300x600">
                        <!-- Google AdSense Code Here -->
                        <div class="ad-placeholder">
                            <i class="fas fa-ad"></i>
                            <p>Google AdSense<br>300x600</p>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="main-column">
                    <article class="comparison-article">
                        <!-- Breadcrumb Navigation -->
                        <nav class="breadcrumb">
                            <a href="/">Home</a>
                            <?php foreach ($categoryParts as $index => $part): ?>
                                <span class="separator">&gt;</span>
                                <?php if ($index === count($categoryParts) - 1): ?>
                                    <a href="/category/<?php echo generateSlug($part); ?>"><?php echo htmlspecialchars($part); ?></a>
                                <?php else: ?>
                                    <span><?php echo htmlspecialchars($part); ?></span>
                                <?php endif; ?>
                            <?php endforeach; ?>
                            <span class="separator">&gt;</span>
                            <span class="current"><?php echo htmlspecialchars($comparison['title']); ?></span>
                        </nav>

                        <!-- Article Header -->
                        <header class="article-header">
                            <h1><?php echo htmlspecialchars($comparison['title']); ?></h1>
                            <p class="article-intro"><?php echo htmlspecialchars($comparison['introduction']); ?></p>
                            <div class="article-meta">
                                <span class="updated-date">Updated <?php echo date('M j, Y', strtotime($comparison['updated_at'])); ?></span>
                                <span class="category-badge"><?php echo htmlspecialchars($comparison['category_name']); ?></span>
                            </div>
                        </header>

                        <!-- Comparison Table -->
                        <section class="comparison-section">
                            <div class="comparison-table-wrapper">
                                <h2>Detailed Specifications</h2>
                                <div class="table-responsive">
                                    <table class="comparison-table">
                                        <thead>
                                            <tr>
                                                <th class="feature-column">Feature</th>
                                                <?php foreach ($items as $item): ?>
                                                <th class="item-column"><?php echo htmlspecialchars($item['name']); ?></th>
                                                <?php endforeach; ?>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($features as $feature): ?>
                                            <tr>
                                                <td class="feature-name"><?php echo htmlspecialchars($feature['feature_name']); ?></td>
                                                <?php 
                                                $values = json_decode($feature['feature_values'], true);
                                                foreach ($items as $item): 
                                                ?>
                                                <td class="feature-value">
                                                    <?php echo htmlspecialchars($values[$item['name']] ?? '—'); ?>
                                                </td>
                                                <?php endforeach; ?>
                                            </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <!-- Product Images -->
                        <?php 
                        $hasImages = false;
                        foreach ($items as $item) {
                            if (!empty($item['image'])) {
                                $hasImages = true;
                                break;
                            }
                        }
                        if ($hasImages): 
                        ?>
                        <section class="product-images">
                            <h2>Product Gallery</h2>
                            <div class="image-grid">
                                <?php foreach ($items as $item): ?>
                                    <?php if (!empty($item['image'])): ?>
                                    <div class="product-image">
                                        <h3><?php echo htmlspecialchars($item['name']); ?></h3>
                                        <img src="<?php echo htmlspecialchars($item['image']); ?>" 
                                             alt="<?php echo htmlspecialchars($item['name']); ?>" 
                                             loading="lazy">
                                    </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </section>
                        <?php endif; ?>

                        <!-- Product Descriptions -->
                        <section class="product-descriptions">
                            <h2>Detailed Overview</h2>
                            <div class="descriptions-grid">
                                <?php foreach ($items as $item): ?>
                                <div class="product-description">
                                    <h3><?php echo htmlspecialchars($item['name']); ?></h3>
                                    <p><?php echo htmlspecialchars($item['description']); ?></p>
                                    <?php 
                                    $specs = json_decode($item['specifications'], true);
                                    if (!empty($specs)): 
                                    ?>
                                    <ul class="spec-list">
                                        <?php foreach ($specs as $key => $value): ?>
                                        <li><strong><?php echo htmlspecialchars($key); ?>:</strong> <?php echo htmlspecialchars($value); ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                    <?php endif; ?>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </section>

                        <!-- YouTube Videos -->
                        <?php 
                        $videos = array_filter($media, function($m) { return $m['type'] === 'video'; });
                        if (!empty($videos)): 
                        ?>
                        <section class="video-section">
                            <h2>Video Reviews</h2>
                            <div class="video-grid">
                                <?php foreach ($videos as $video): ?>
                                <div class="video-wrapper">
                                    <iframe src="<?php echo htmlspecialchars($video['url']); ?>" 
                                            frameborder="0" 
                                            allowfullscreen 
                                            loading="lazy"></iframe>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </section>
                        <?php endif; ?>

                        <!-- Disclaimer -->
                        <?php if ($comparison['disclaimer']): ?>
                        <div class="disclaimer">
                            <div class="disclaimer-content">
                                <i class="fas fa-info-circle"></i>
                                <div>
                                    <strong>Disclaimer:</strong> <?php echo htmlspecialchars($comparison['disclaimer']); ?>
                                </div>
                            </div>
                        </div>
                        <?php endif; ?>
                    </article>
                </div>

                <!-- Right Ad Zone -->
                <aside class="ad-sidebar">
                    <div class="ad-zone sticky-ad" data-size="300x600">
                        <!-- Google AdSense Code Here -->
                        <div class="ad-placeholder">
                            <i class="fas fa-ad"></i>
                            <p>Google AdSense<br>300x600</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    <!-- Mobile Ad Banner -->
    <div class="mobile-ad-banner">
        <div class="ad-zone" data-size="320x50">
            <!-- Google AdSense Code Here -->
            <div class="ad-placeholder">
                <i class="fas fa-ad"></i>
                <p>Google AdSense 320x50</p>
                <button class="ad-close"><i class="fas fa-times"></i></button>
            </div>
        </div>
    </div>

    <?php include 'includes/footer.php'; ?>
    
    <script src="/assets/js/main.js"></script>
</body>
</html>