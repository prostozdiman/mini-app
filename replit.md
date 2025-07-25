# Trading Signals Application

## Overview

This is a full-stack trading signals application built with React/TypeScript frontend and Express.js backend. The application provides a modern trading interface with real-time signals, currency pair analysis, and a cyberpunk-themed UI design optimized for mobile devices and server deployment. Features complete trading pair selection (50+ pairs from screenshots), expandable UI with smooth animations, and timer-based signal generation. The architecture follows a monorepo structure with shared TypeScript schemas and optimized for weak mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Status

✅ **COMPLETED** - Professional Trading Signals Mini App ready for deployment and Instagram marketing videos

## Recent Changes (January 25, 2025)

✓ Added complete 50+ currency pairs from user screenshots with expandable functionality
✓ Implemented automatic navigation flow - no confirmation buttons needed
✓ Fixed scrolling issues with custom scrollbar for pairs selection
✓ Added professional marketing footer with trust indicators and live status
✓ Optimized for mobile devices and server deployment
✓ Created convincing AI-powered interface perfect for social media marketing

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: TailwindCSS with shadcn/ui components for consistent design system
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom theming for accessibility and consistency

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with tsx and Vite integration for development workflow

### Design System
- **Component Library**: shadcn/ui with "new-york" style configuration
- **Theme**: Dark cyberpunk theme with neon accents (cyan, green, red)
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `./shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Managed through `./migrations` directory
- **Connection**: Neon Database serverless driver for PostgreSQL connections

### UI Components
- **Trading Interface**: Multi-screen flow (pairs → timeframe → analysis → signals)
- **Currency Pairs**: 50+ complete trading pairs from screenshots with expandable "Show More" functionality
- **Real-time Elements**: Animated counters, live user counts, countdown timers, signal age tracking
- **Signal Restrictions**: Timer-based signal generation preventing spam (5s, 10s, 15s, 30s intervals)
- **Flag Visualization**: Overlapping flag design with country-specific color schemes for professional appearance
- **Signal Strength**: Visual indicators with 1-5 strength rating system and pulsing animations

### Authentication System
- **User Management**: Basic user schema with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Session Handling**: Express sessions with PostgreSQL persistence

## Data Flow

### Client-Server Communication
1. **API Layer**: RESTful endpoints under `/api` prefix
2. **Query Management**: TanStack React Query for caching and synchronization
3. **Real-time Updates**: Polling-based updates for live trading data
4. **Error Handling**: Centralized error handling with toast notifications

### State Management Pattern
1. **Server State**: Managed by React Query with optimistic updates
2. **Client State**: React hooks for UI state and trading flow management
3. **Shared State**: Type-safe schemas shared between frontend and backend

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations and validation
- **UI Framework**: Extensive Radix UI component library
- **Styling**: TailwindCSS with PostCSS processing
- **Date Handling**: `date-fns` for time-based operations

### Development Tools
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Checking**: TypeScript with strict configuration
- **Database Management**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React application to `dist/public`
2. **Backend**: esbuild compiles TypeScript server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Hot reload with tsx, Vite dev server integration
- **Production**: Node.js server serving built assets and API endpoints optimized for external hosting
- **Database**: Environment-based DATABASE_URL configuration
- **Performance**: Optimized for weak mobile devices with efficient animations and minimal resource usage

### Server Deployment Considerations
- Application is designed to work seamlessly when deployed to external servers
- No hardcoded localhost dependencies or development-specific configurations
- Static assets properly served from build directory
- All API endpoints use relative paths for production compatibility

### File Structure Organization
```
├── client/          # React frontend application
├── server/          # Express.js backend
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

The application uses a modern development workflow with TypeScript throughout, ensuring type safety from database to UI components. The trading interface is designed for real-time engagement with animated elements and a gaming-inspired aesthetic.