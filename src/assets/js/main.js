// Tech-Compare JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const hamburgers = mobileToggle.querySelectorAll('.hamburger');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // Mobile ad close functionality
    const adCloseButtons = document.querySelectorAll('.ad-close');
    adCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const adBanner = button.closest('.mobile-ad-banner');
            if (adBanner) {
                adBanner.style.display = 'none';
                // Add padding to body to compensate for removed fixed banner
                document.body.style.paddingBottom = '0';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Sticky ad positioning adjustment
    function adjustStickyAds() {
        const stickyAds = document.querySelectorAll('.sticky-ad');
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        stickyAds.forEach(ad => {
            ad.style.top = `${headerHeight + 20}px`;
        });
    }
    
    // Run on load and resize
    adjustStickyAds();
    window.addEventListener('resize', adjustStickyAds);
    
    // Table responsive wrapper
    const tables = document.querySelectorAll('.comparison-table');
    tables.forEach(table => {
        if (!table.closest('.table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
    
    // Enhanced dropdown behavior
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Handle touch devices
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    menu.style.position = 'static';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                }
            });
        }
    });
    
    // Performance optimization: debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Add scroll-based functionality here if needed
        }, 100);
    });
    
    // Analytics event tracking (placeholder for Google Analytics)
    function trackEvent(action, category, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
    }
    
    // Track comparison card clicks
    const comparisonCards = document.querySelectorAll('.comparison-card');
    comparisonCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = card.querySelector('h3')?.textContent;
            if (title) {
                trackEvent('click', 'comparison_card', title);
            }
        });
    });
    
    // Track category clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = card.querySelector('h3')?.textContent;
            if (category) {
                trackEvent('click', 'category', category);
            }
        });
    });
    
    // Add loading states for better UX
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            }
        });
    });
    
    // Back to top functionality
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    console.log('Tech-Compare initialized successfully');
});