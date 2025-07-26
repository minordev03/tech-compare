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
- **Comparison Schema**: Product/service comparison data with items, specifications, and metadata
- **Category Schema**: Hierarchical categorization system
- **Search Results**: Structured search response format

### Frontend Components
- **Layout Components**: Header with search, Footer with navigation
- **Comparison Components**: ComparisonCard, ComparisonTable for data display
- **Ad Integration**: AdZone component for Google AdSense placement
- **UI Components**: Comprehensive Shadcn/ui component library

### Backend Services
- **Storage Interface**: Abstract storage layer with in-memory implementation
- **Route Handlers**: Express routes for comparisons, categories, and search
- **Development Tools**: Vite integration for hot reloading in development

## Data Flow

### Request Flow
1. Client makes API requests to Express server endpoints
2. Server routes requests to appropriate handlers
3. Handlers interact with storage layer (currently in-memory)
4. Responses formatted as JSON and returned to client
5. TanStack Query manages caching and state updates

### Page Generation
- Static pages generated from JSON templates (planned feature)
- Dynamic routing for comparison and category pages
- Server-side rendering capabilities through Vite SSR

## External Dependencies

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- FontAwesome classes referenced for icons

### Development Tools
- Replit-specific plugins for development environment
- TypeScript for type safety across the stack
- ESBuild for production bundling

### Database and ORM
- Drizzle ORM with Zod schema validation
- PostgreSQL database (configured for Neon)
- Connection pooling and serverless optimization

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Assets: Static files served from build directory

### Environment Configuration
- Development: Vite dev server with Express API
- Production: Node.js server serving static files and API
- Database: Environment variable for connection string

### Containerization Ready
- ES modules throughout the application
- Clean separation between client and server code
- Environment-based configuration for different deployment targets

### Key Features
- Responsive design for mobile and desktop
- SEO-ready with metadata management
- Ad placement zones for monetization
- Search functionality across all content
- Category-based navigation and filtering