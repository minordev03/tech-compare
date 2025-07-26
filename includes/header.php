<!-- Tech-Compare Header -->
<header class="header">
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <a href="/" class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    Tech-Compare
                </a>
                
                <ul class="nav-menu" id="navMenu">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Categories <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            <?php if (isset($categories) && !empty($categories)): ?>
                                <?php foreach ($categories as $category): ?>
                                <a href="/category/<?php echo $category['slug']; ?>" class="dropdown-item">
                                    <i class="<?php echo $category['icon']; ?>"></i>
                                    <?php echo htmlspecialchars($category['name']); ?>
                                    <span class="count"><?php echo $category['comparison_count']; ?></span>
                                </a>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="dropdown-item">
                                    <i class="fas fa-info-circle"></i>
                                    No categories yet
                                </div>
                            <?php endif; ?>
                        </div>
                    </li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                </ul>
                
                <button class="mobile-toggle" id="mobileToggle">
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                </button>
            </div>
        </div>
    </nav>
</header>