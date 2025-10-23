# KwikChat WhatsApp Business Automation

## Overview

KwikChat is a WhatsApp Business automation platform that enables businesses to manage customer conversations with intelligent automation and human intervention. The platform integrates with Meta's WhatsApp Cloud API to provide real-time messaging, programmable automation rules, and comprehensive conversation management.

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
- Custom color scheme featuring primary green (#22c55e area) inspired by KwikFlow branding

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
- WhatsApp webhook integration for receiving messages

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
- Conversations: WhatsApp conversation tracking with contact information
- Messages: Individual message storage with sender, content, and metadata
- Sessions: Conversation session management with metadata
- Automation Rules: Business logic automation configurations with triggers and actions

**In-Memory Fallback:**
- `MemStorage` class implements `IStorage` interface for development/testing
- Enables application to run without database connection
- Maps-based storage for all entities with auto-incrementing IDs
- Includes sample data for development

**Rationale:** PostgreSQL provides reliability and SQL capabilities needed for relational data. Drizzle was chosen over heavier ORMs like Prisma for its lighter weight and direct SQL generation. The storage interface pattern enables easy swapping between database implementations and facilitates testing.

### External Dependencies

**Third-Party Services:**

1. **WhatsApp Business Cloud API:**
   - Purpose: Real-time messaging integration with WhatsApp
   - Configuration: Meta Business account with WhatsApp Cloud API access
   - Required environment variables: `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`, `WHATSAPP_VERIFY_TOKEN`
   - Implementation: Webhook for receiving messages, REST API for sending messages

2. **Development Tools:**
   - Replit-specific plugins for development environment integration
   - Runtime error overlay for development debugging
   - Cartographer plugin for Replit IDE integration (development only)

**Font Dependencies:**
- Google Fonts: Inter font family (weights 400-800) for typography
- Preconnect optimization for faster font loading

**Rationale:** WhatsApp Cloud API provides direct integration with WhatsApp Business without requiring a physical device. The development tooling integrates seamlessly with Replit's environment while remaining removable for other deployment targets.

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
