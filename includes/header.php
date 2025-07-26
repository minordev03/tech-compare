<header class="header">
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <!-- Logo -->
                <div class="logo">
                    <a href="/">
                        <div class="logo-icon">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <span class="logo-text">Tech-Compare</span>
                    </a>
                </div>

                <!-- Navigation Menu -->
                <div class="nav-menu" id="navMenu">
                    <a href="/" class="nav-link <?php echo ($_SERVER['REQUEST_URI'] == '/') ? 'active' : ''; ?>">Home</a>
                    
                    <?php if (!empty($categories)): ?>
                        <div class="nav-dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Categories <i class="fas fa-chevron-down"></i></a>
                            <div class="dropdown-menu">
                                <?php foreach ($categories as $category): ?>
                                    <a href="/category/<?php echo $category['slug']; ?>" class="dropdown-item">
                                        <i class="<?php echo $category['icon']; ?>"></i>
                                        <?php echo htmlspecialchars($category['name']); ?>
                                        <span class="count">(<?php echo $category['comparison_count']; ?>)</span>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endif; ?>
                    
                    <a href="/about" class="nav-link">About</a>
                </div>

                <!-- Mobile Menu Toggle -->
                <button class="mobile-toggle" id="mobileToggle">
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                </button>
            </div>
        </div>
    </nav>
</header>