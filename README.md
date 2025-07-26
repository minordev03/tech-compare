# Tech-Compare - Product Comparison Website

A PHP-based product comparison platform with AI-generated content management, static page generation, and automated SEO optimization.

## Features

- **Dynamic Comparison Pages**: Side-by-side product and service comparisons
- **AI Content Integration**: JSON-based content import from AI-generated data
- **Static Page Generation**: Optimized HTML pages for better performance and SEO
- **Admin API**: Secure endpoints for automated content management
- **Responsive Design**: Mobile-friendly interface with modern styling
- **Google AdSense Integration**: Strategic ad placement for monetization
- **SEO Optimization**: Automated sitemap and robots.txt management

## Architecture

### Technology Stack
- **Backend**: PHP 8+ with MySQL database
- **Frontend**: Custom CSS and vanilla JavaScript
- **Web Server**: Apache with mod_rewrite
- **Database**: MySQL with optimized comparison schema

### Key Components

1. **Main Web Application** (`index.php`)
   - Homepage with featured comparisons
   - Category navigation (auto-generated)
   - Responsive layout with ad zones

2. **Comparison System** (`comparison.php`)
   - Dynamic comparison pages
   - SEO-optimized meta tags
   - Structured data markup

3. **Admin API** (`/api/admin/`)
   - Token-based authentication
   - JSON content import
   - Automated site updates

4. **Static Page Generator** (`templates/comparison_template.html`)
   - HTML template system
   - Performance optimization
   - Consistent branding

## Installation

### Database Setup
1. Create MySQL database and user
2. Import schema: `mysql < config/database_schema.sql`
3. Update database credentials in `config/database.php`

### Web Server Configuration
1. Ensure Apache mod_rewrite is enabled
2. Configure document root to project directory
3. Upload files maintaining directory structure

### Admin API Setup
1. Generate secure admin token (replace default)
2. Update token in database: `admin_tokens` table
3. Configure environment variables for production

## Content Management

### JSON Format
Content is imported via JSON following this structure:

```json
{
  "title": "Product A vs Product B",
  "category": "Electronics > Smartphones",
  "introduction": "Comprehensive comparison...",
  "items": [...],
  "comparison_table": [...],
  "seo_metadata": {...}
}
```

### AI Prompt Template
Use this prompt to generate comparison content:

```
Generate a comprehensive product comparison in JSON format for: [PRODUCT LIST]

Requirements:
1. Research current specifications and pricing
2. Create 8-12 meaningful comparison features
3. Write detailed, unbiased descriptions
4. Generate SEO-optimized metadata
5. Include high-quality image URLs
6. Format as valid JSON matching Tech-Compare schema
```

### Import Process
1. Generate JSON content using AI
2. Validate format against specification
3. Import via Admin API:
   ```bash
   curl -X POST https://your-domain.com/api/admin/import \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d @comparison.json
   ```

## API Endpoints

### Import Comparison
**POST** `/api/admin/import`
- Headers: `Authorization: Bearer TOKEN`
- Body: JSON comparison data
- Response: Success status and generated URLs

### Update Homepage
**POST** `/api/admin/update-homepage`
- Headers: `Authorization: Bearer TOKEN`
- Updates: robots.txt, sitemap.xml, navigation

## File Structure

```
/
├── index.php                    # Homepage
├── comparison.php               # Comparison page handler
├── category.php                 # Category page handler
├── .htaccess                    # Apache configuration
├── config/
│   ├── database.php             # Database connection
│   └── database_schema.sql      # Database structure
├── includes/
│   ├── functions.php            # Core functions
│   ├── header.php               # Site header
│   └── footer.php               # Site footer
├── api/admin/
│   ├── import.php               # Content import endpoint
│   └── update-homepage.php      # Site update endpoint
├── templates/
│   └── comparison_template.html # Static page template
├── assets/
│   ├── css/style.css            # Main stylesheet
│   └── js/main.js               # JavaScript functionality
├── static/comparison/           # Generated static pages
└── logs/                        # Activity logs
```

## SEO Features

- **Meta Tags**: Automated title, description, and keywords
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Dynamic crawling instructions
- **Clean URLs**: SEO-friendly URL structure

## Security

- **Token Authentication**: Secure admin API access
- **Input Validation**: JSON schema validation
- **SQL Injection Protection**: PDO prepared statements
- **XSS Prevention**: HTML escaping throughout
- **File Access Control**: Protected sensitive directories

## Monitoring

- **Activity Logs**: All admin actions logged
- **Error Handling**: Graceful error responses
- **Performance**: Static page serving for speed
- **Analytics Ready**: Google Analytics integration points

## Production Deployment

1. **HTTPS Configuration**: Uncomment HTTPS redirect in .htaccess
2. **Security Headers**: Review and adjust security settings
3. **Database Optimization**: Configure MySQL for production load
4. **Admin Token**: Generate strong, unique admin token
5. **Google AdSense**: Replace placeholders with actual ad code
6. **Monitoring**: Set up logging and error monitoring

## Support

For technical assistance:
1. Check activity logs in `/logs/activity.log`
2. Verify database connections and permissions
3. Validate JSON format against specification
4. Review Apache error logs for URL rewriting issues

## Version History

- **v1.0.0**: Initial PHP implementation with admin API
- Core comparison system with static page generation
- Google AdSense integration and SEO optimization