<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo">
                    <div class="logo-icon">
                        <i class="fas fa-balance-scale"></i>
                    </div>
                    <span class="logo-text">Tech-Compare</span>
                </div>
                <p class="footer-description">
                    Making informed decisions through comprehensive product and service comparisons.
                </p>
            </div>

            <?php if (!empty($categories)): ?>
            <div class="footer-section">
                <h3>Categories</h3>
                <ul class="footer-links">
                    <?php foreach (array_slice($categories, 0, 6) as $category): ?>
                        <li><a href="/category/<?php echo $category['slug']; ?>"><?php echo htmlspecialchars($category['name']); ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

            <div class="footer-section">
                <h3>Company</h3>
                <ul class="footer-links">
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#" class="social-link" aria-label="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-link" aria-label="Facebook">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" class="social-link" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="#" class="social-link" aria-label="YouTube">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
                <div class="twitter-follow">
                    <a href="#" class="twitter-follow-btn">
                        <i class="fab fa-twitter"></i>
                        Follow us on Twitter
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Tech-Compare. All rights reserved.</p>
            <p>Powered by intelligent comparison technology</p>
        </div>
    </div>
</footer>