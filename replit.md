# Tech-Compare PHP Project

## Overview

Tech-Compare is a product comparison website built with PHP and MySQL, designed to provide comprehensive side-by-side comparisons of products and services. The system features automated content management through AI-generated JSON imports, static page generation for SEO optimization, and Google AdSense integration for monetization.

## User Preferences

- Preferred communication style: Simple, everyday language
- Technology stack: PHP with MySQL (not React/Node.js)
- Content management: AI-generated JSON format with admin API
- Page generation: Static HTML pages with dynamic fallback
- SEO focus: Automated robots.txt and sitemap management

## System Architecture

### Backend Architecture
- **Language**: PHP 8+ with MySQL database
- **Web Server**: Apache with mod_rewrite for clean URLs
- **Database**: MySQL with optimized schema for comparison data
- **API Design**: RESTful admin endpoints with token authentication
- **Content Management**: JSON-based import system with validation

### Frontend Architecture
- **Styling**: Custom CSS with modern design principles
- **JavaScript**: Vanilla JS for interactive features
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Ad Integration**: Google AdSense zones with strategic placement
- **SEO Optimization**: Meta tags, structured data, and semantic HTML

### Static Page Generation
- **Template System**: HTML templates with placeholder replacement
- **Generator**: PHP-based static page creation from database content
- **File Management**: Automatic static file serving with dynamic fallback
- **Performance**: Cached static pages for faster load times

## Key Components

### Core Data Models
- **MySQL Database Schema**: Optimized tables for comparisons, categories, items, and features
- **JSON Content Format**: Standardized structure for AI-generated comparison imports
- **Admin Token System**: Secure authentication for content management API

### Page Components
- **Homepage**: Featured comparisons and category navigation
- **Comparison Pages**: Dynamic and static comparison displays with SEO optimization
- **Category Pages**: Filtered listings by product/service category
- **Admin API**: Secure endpoints for automated content import and site updates

### Template System
- **Static HTML Generation**: Template-based page creation for performance
- **Dynamic Fallback**: PHP-powered pages when static files unavailable
- **SEO Optimization**: Meta tags, structured data, and clean URLs

## Data Flow

### Content Import Process
1. AI generates JSON content using specified format
2. Content validated against schema requirements
3. Admin API processes import with token authentication
4. Database entries created for comparison data
5. Static HTML pages generated from templates
6. Robots.txt and sitemap.xml automatically updated

### Page Serving
- Static HTML served directly for best performance
- Dynamic PHP fallback for real-time updates
- Apache mod_rewrite handles clean URL routing
- Google AdSense zones integrated throughout

## Technology Stack

### Core Technologies
- **Backend**: PHP 8.2+ with PDO for database operations
- **Database**: MySQL 8.0+ with JSON column support
- **Web Server**: Apache with mod_rewrite for clean URLs
- **Frontend**: Custom CSS with vanilla JavaScript

### External Dependencies
- **FontAwesome**: Icon library for UI elements
- **Google AdSense**: Advertising integration
- **JSON-LD**: Structured data for search engines

## Deployment Strategy

### Production Setup
- **PHP Environment**: PHP 8.2+ with MySQL PDO extensions
- **Database**: MySQL 8.0+ server with created schema
- **Web Server**: Apache with mod_rewrite enabled
- **Security**: HTTPS redirection and security headers configured

### File Structure
- **Static Pages**: Generated in `/static/comparison/` directory
- **Templates**: HTML templates in `/templates/` directory
- **Assets**: CSS and JavaScript in `/assets/` directory
- **API**: Admin endpoints in `/api/admin/` directory

### Current Status
- ✅ Complete PHP-based architecture implemented
- ✅ Database schema created with sample categories
- ✅ Admin API with secure token authentication
- ✅ Static page generation system functional
- ✅ Responsive design with ad integration
- ⚠️ Ready for database setup and content import