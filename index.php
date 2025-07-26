<?php
require_once 'config/database.php';
require_once 'includes/functions.php';

// Get categories for navigation
$categories = getCategories($pdo);
$featuredComparisons = getFeaturedComparisons($pdo, 6);
$recentComparisons = getRecentComparisons($pdo, 5);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech-Compare - Compare Products & Services</title>
    <meta name="description" content="Make informed decisions with comprehensive side-by-side comparisons of software, electronics, and appliances.">
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="Tech-Compare - Compare Products & Services">
    <meta property="og:description" content="Make informed decisions with comprehensive side-by-side comparisons of software, electronics, and appliances.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo getCurrentUrl(); ?>">
    
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1>Compare Products & Services</h1>
            <p class="hero-subtitle">Make informed decisions with comprehensive side-by-side comparisons of software, electronics, and appliances.</p>
        </div>
    </section>

    <main class="main-content">
        <div class="container">
            <div class="content-grid">
                <!-- Left Ad Zone -->
                <aside class="ad-sidebar">
                    <div class="ad-zone" data-size="300x600">
                        <div class="ad-placeholder">
                            <i class="fas fa-ad"></i>
                            <p>Google AdSense<br>300x600</p>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="main-column">
                    <?php if (!empty($featuredComparisons)): ?>
                    <!-- Featured Comparisons -->
                    <section class="section">
                        <h2>Featured Comparisons</h2>
                        <div class="comparison-grid">
                            <?php foreach ($featuredComparisons as $comparison): ?>
                                <article class="comparison-card">
                                    <?php if ($comparison['featured_image']): ?>
                                        <img src="<?php echo htmlspecialchars($comparison['featured_image']); ?>" alt="<?php echo htmlspecialchars($comparison['title']); ?>" class="card-image">
                                    <?php endif; ?>
                                    <div class="card-content">
                                        <span class="category-badge"><?php echo htmlspecialchars($comparison['category_name']); ?></span>
                                        <h3><?php echo htmlspecialchars($comparison['title']); ?></h3>
                                        <p class="card-description"><?php echo htmlspecialchars(substr($comparison['introduction'], 0, 150)) . '...'; ?></p>
                                        <div class="card-footer">
                                            <span class="updated-date">Updated <?php echo date('M j, Y', strtotime($comparison['updated_at'])); ?></span>
                                            <a href="/comparison/<?php echo $comparison['slug']; ?>" class="view-link">View Comparison →</a>
                                        </div>
                                    </div>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    </section>
                    <?php endif; ?>

                    <!-- Category Navigation -->
                    <?php if (!empty($categories)): ?>
                    <section class="section">
                        <h2>Browse by Category</h2>
                        <div class="category-grid">
                            <?php foreach ($categories as $category): ?>
                                <a href="/category/<?php echo $category['slug']; ?>" class="category-card">
                                    <i class="<?php echo $category['icon']; ?>"></i>
                                    <h3><?php echo htmlspecialchars($category['name']); ?></h3>
                                    <p><?php echo $category['comparison_count']; ?> comparisons</p>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </section>
                    <?php endif; ?>

                    <?php if (!empty($recentComparisons)): ?>
                    <!-- Recent Comparisons -->
                    <section class="section">
                        <h2>Recent Comparisons</h2>
                        <div class="recent-list">
                            <?php foreach ($recentComparisons as $comparison): ?>
                                <article class="recent-item">
                                    <div class="recent-icon">
                                        <i class="fas fa-balance-scale"></i>
                                    </div>
                                    <div class="recent-content">
                                        <h3><?php echo htmlspecialchars($comparison['title']); ?></h3>
                                        <p class="recent-category"><?php echo htmlspecialchars($comparison['category_path']); ?></p>
                                        <p class="recent-date">Updated <?php echo date('M j, Y', strtotime($comparison['updated_at'])); ?></p>
                                    </div>
                                    <a href="/comparison/<?php echo $comparison['slug']; ?>" class="recent-link">View →</a>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    </section>
                    <?php endif; ?>

                    <?php if (empty($featuredComparisons) && empty($categories) && empty($recentComparisons)): ?>
                    <!-- Empty State -->
                    <section class="section">
                        <div class="empty-state">
                            <i class="fas fa-search-plus"></i>
                            <h2>No Comparisons Available</h2>
                            <p>Comparisons will appear here once they are added through the admin API.</p>
                        </div>
                    </section>
                    <?php endif; ?>
                </div>

                <!-- Right Ad Zone -->
                <aside class="ad-sidebar">
                    <div class="ad-zone" data-size="300x600">
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