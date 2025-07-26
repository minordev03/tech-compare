# Tech-Compare Replit Project

## Overview

Tech-Compare is a modern web application for product and service comparisons, built with a full-stack TypeScript architecture. The application provides side-by-side comparisons across categories like software, electronics, and home appliances, featuring a clean, modern interface with integrated advertising support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Design System**: Modern, clean interface with blue accent colors

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Design**: RESTful endpoints with JSON responses
- **Middleware**: Express middleware for logging, JSON parsing, and error handling

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migration Management**: Drizzle Kit for database migrations
- **Database Configuration**: PostgreSQL dialect with environment-based connection

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