-- Tech-Compare Database Schema
-- MySQL 8.0+ compatible

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) NOT NULL DEFAULT 'fas fa-folder',
    description TEXT,
    comparison_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_comparison_count (comparison_count)
);

-- Comparisons table
CREATE TABLE comparisons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    category_path VARCHAR(500) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    introduction TEXT NOT NULL,
    featured_image VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    keywords JSON,
    disclaimer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_slug (slug),
    INDEX idx_category_id (category_id),
    INDEX idx_featured (featured),
    INDEX idx_created_at (created_at),
    FULLTEXT KEY ft_search (title, introduction, meta_description)
);

-- Comparison items table
CREATE TABLE comparison_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comparison_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500),
    specifications JSON,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comparison_id) REFERENCES comparisons(id) ON DELETE CASCADE,
    INDEX idx_comparison_id (comparison_id),
    INDEX idx_display_order (display_order)
);

-- Comparison features table
CREATE TABLE comparison_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comparison_id INT NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    feature_values JSON NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comparison_id) REFERENCES comparisons(id) ON DELETE CASCADE,
    INDEX idx_comparison_id (comparison_id),
    INDEX idx_display_order (display_order)
);

-- Comparison media table
CREATE TABLE comparison_media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comparison_id INT NOT NULL,
    type ENUM('image', 'video') NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comparison_id) REFERENCES comparisons(id) ON DELETE CASCADE,
    INDEX idx_comparison_id (comparison_id),
    INDEX idx_type (type),
    INDEX idx_display_order (display_order)
);

-- Static pages table
CREATE TABLE static_pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comparison_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comparison_id) REFERENCES comparisons(id) ON DELETE CASCADE,
    INDEX idx_comparison_id (comparison_id),
    INDEX idx_file_path (file_path)
);

-- Admin tokens table
CREATE TABLE admin_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
);

-- Activity logs table
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(255) NOT NULL,
    description TEXT,
    level ENUM('INFO', 'WARNING', 'ERROR') DEFAULT 'INFO',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_level (level),
    INDEX idx_action (action)
);

-- Site configuration table
CREATE TABLE site_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_config_key (config_key)
);

-- Triggers to update category comparison counts
DELIMITER $$

CREATE TRIGGER update_category_count_insert 
    AFTER INSERT ON comparisons 
    FOR EACH ROW 
BEGIN
    UPDATE categories 
    SET comparison_count = (
        SELECT COUNT(*) FROM comparisons WHERE category_id = NEW.category_id
    ) 
    WHERE id = NEW.category_id;
END$$

CREATE TRIGGER update_category_count_delete 
    AFTER DELETE ON comparisons 
    FOR EACH ROW 
BEGIN
    UPDATE categories 
    SET comparison_count = (
        SELECT COUNT(*) FROM comparisons WHERE category_id = OLD.category_id
    ) 
    WHERE id = OLD.category_id;
END$$

CREATE TRIGGER update_category_count_update 
    AFTER UPDATE ON comparisons 
    FOR EACH ROW 
BEGIN
    IF OLD.category_id != NEW.category_id THEN
        UPDATE categories 
        SET comparison_count = (
            SELECT COUNT(*) FROM comparisons WHERE category_id = OLD.category_id
        ) 
        WHERE id = OLD.category_id;
        
        UPDATE categories 
        SET comparison_count = (
            SELECT COUNT(*) FROM comparisons WHERE category_id = NEW.category_id
        ) 
        WHERE id = NEW.category_id;
    END IF;
END$$

DELIMITER ;

-- Insert default admin token (CHANGE IN PRODUCTION!)
INSERT INTO admin_tokens (token, description) VALUES 
('tech_compare_admin_2024_default_token', 'Default admin token - CHANGE IN PRODUCTION');

-- Insert default site configuration
INSERT INTO site_config (config_key, config_value) VALUES 
('site_name', 'Tech-Compare'),
('site_description', 'Comprehensive product and service comparisons'),
('site_url', 'https://your-domain.com'),
('robots_txt_enabled', 'true'),
('sitemap_enabled', 'true'),
('adsense_enabled', 'false'),
('adsense_publisher_id', ''),
('analytics_enabled', 'false'),
('analytics_tracking_id', '');

-- Insert sample categories
INSERT INTO categories (name, slug, icon, description) VALUES 
('Software', 'software', 'fas fa-laptop', 'Software applications and tools'),
('Electronics', 'electronics', 'fas fa-mobile-alt', 'Electronic devices and gadgets'),
('Home Appliances', 'home-appliances', 'fas fa-home', 'Kitchen and home appliances'),
('Automotive', 'automotive', 'fas fa-car', 'Vehicles and automotive products');

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;