# KwikTrak GPS Tracking Application

## Overview

KwikTrak is a GPS tracking service platform targeting the South African market. The application allows customers to order GPS tracking devices, view tracking data, and manage their devices through a web-based dashboard. The platform offers real-time GPS tracking with cellular connectivity at R79/month per device, featuring a 30-day battery life and comprehensive geofencing capabilities.

The application is built as a full-stack TypeScript solution with a React frontend and Express backend, designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast HMR and optimized production builds
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and data fetching

**UI Component Library:**
- Shadcn/ui component system with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant selected for component theming
- Custom color scheme featuring primary blue (#1F7A8C area), accent green (#A9D65C), with HSL-based theming system

**Rationale:** This stack provides a modern, performant developer experience while maintaining a lightweight bundle size. Shadcn/ui was chosen over heavier component libraries to provide full control over components while still benefiting from accessibility-focused Radix primitives.

### Backend Architecture

**Server Framework:**
- Express.js for REST API implementation
- TypeScript throughout for type safety
- Module-based architecture (ESM) for modern JavaScript standards

**Development & Production:**
- Development: tsx for TypeScript execution with hot reload
- Production: esbuild for bundling with external package handling
- Vite middleware integration in development for seamless frontend/backend communication

**API Structure:**
- RESTful endpoints under `/api` prefix
- JSON-based request/response format
- Error handling middleware for consistent error responses
- Request logging middleware for debugging

**Rationale:** Express provides a minimal, unopinionated foundation suitable for the application's straightforward API needs. The separation between development and production builds ensures fast iteration during development while maintaining production efficiency.

### Data Storage Solutions

**Database:**
- PostgreSQL as the primary database (configured via Drizzle)
- Neon Database serverless driver (`@neondatabase/serverless`) for connection pooling and edge compatibility
- Database URL provided via `DATABASE_URL` environment variable

**ORM & Schema:**
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript types generated from database schema
- Drizzle Kit for migrations and schema management
- Zod integration via `drizzle-zod` for runtime validation

**Data Models:**
- Users: Authentication and user management
- Conversations: WhatsApp/messaging conversation tracking
- Messages: Individual message storage with sender, content, and metadata
- Sessions: User session management with metadata
- Automation Rules: Business logic automation configurations

**In-Memory Fallback:**
- `MemStorage` class implements `IStorage` interface for development/testing
- Enables application to run without database connection
- Maps-based storage for all entities with auto-incrementing IDs

**Rationale:** PostgreSQL provides reliability and SQL capabilities needed for relational data. Drizzle was chosen over heavier ORMs like Prisma for its lighter weight and direct SQL generation. The storage interface pattern enables easy swapping between database implementations and facilitates testing.

### Authentication and Authorization

**Session Management:**
- `connect-pg-simple` for PostgreSQL-backed session storage
- Session data persisted in database for multi-instance deployments
- Cookie-based session handling via Express

**Rationale:** While the current codebase shows authentication infrastructure, the implementation appears to be in early stages. PostgreSQL session storage was chosen to support horizontal scaling and persistence across server restarts.

### External Dependencies

**Third-Party Services:**

1. **Email Service - Mailgun:**
   - Purpose: Transactional email for consultation requests and notifications
   - Configuration: EU region endpoint (`api.eu.mailgun.net`)
   - Required environment variables: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`
   - Implementation: Custom email module with HTML templating

2. **Analytics - Google Analytics 4:**
   - Purpose: User behavior tracking and conversion analytics
   - Configuration: `VITE_GA_MEASUREMENT_ID` environment variable
   - Implementation: Custom analytics wrapper with page view and event tracking
   - Features: SPA-aware page tracking, custom event tracking for form submissions

3. **Development Tools:**
   - Replit-specific plugins for development environment integration
   - Runtime error overlay for development debugging
   - Cartographer plugin for Replit IDE integration (development only)

**Asset Management:**
- Static images stored in `attached_assets/generated_images/` directory
- Vite alias `@assets` for clean import paths
- Images include: GPS tracking map visualization, compact GPS device renders, dashboard UI mockups

**Font Dependencies:**
- Google Fonts: Inter font family (weights 400-800) for typography
- Preconnect optimization for faster font loading

**Rationale:** Mailgun provides reliable transactional email with EU data residency. Google Analytics 4 offers comprehensive tracking without requiring third-party tag managers. The development tooling integrates seamlessly with Replit's environment while remaining removable for other deployment targets.

### Build and Deployment

**Scripts:**
- `dev`: Development server with NODE_ENV=development
- `build`: Production build (Vite for frontend, esbuild for backend)
- `start`: Production server execution
- `db:push`: Database schema synchronization via Drizzle Kit

**Environment Strategy:**
- Development and production environments differentiated via NODE_ENV
- Vite-specific environment variables prefixed with `VITE_`
- Replit detection via `REPL_ID` environment variable
- Database configuration via standard `DATABASE_URL` pattern

**Output Structure:**
- Frontend builds to `dist/public/`
- Backend builds to `dist/` (index.js)
- Separate TypeScript compilation for type checking (`tsc --noEmit`)

**Rationale:** The dual-build approach (Vite + esbuild) optimizes each part of the application appropriately. Vite handles frontend bundling with code splitting and asset optimization, while esbuild provides fast server-side bundling with minimal configuration.