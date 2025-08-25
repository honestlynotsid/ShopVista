# Overview

This is a fully responsive React-based e-commerce application built with modern web technologies. The application provides a complete shopping experience with product browsing, cart management, wishlist functionality, and a checkout process. It features a clean, user-friendly interface built with React, TypeScript, and Bootstrap, along with shadcn/ui components for enhanced UI elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React 18 with TypeScript and follows a component-based architecture. The application uses Wouter for client-side routing and React Context API for state management. The UI is styled using a combination of Bootstrap 5, Tailwind CSS, and shadcn/ui components, providing a responsive and modern design system.

## Component Structure
- **Layout Components**: Navbar and Footer provide consistent navigation and branding
- **Product Components**: ProductCard, ProductGrid, FilterSidebar, and QuickView handle product display and interaction
- **Cart Components**: CartOffcanvas for slide-out cart functionality
- **Checkout Components**: Multi-step checkout modal with form validation
- **UI Components**: Extensive shadcn/ui component library for consistent styling

## State Management
The application uses React Context providers for global state:
- **CartContext**: Manages shopping cart items, quantities, pricing calculations, and cart operations
- **WishlistContext**: Handles product wishlist functionality
- Both contexts use useReducer for predictable state updates and complex state logic

## Data Layer
Currently uses in-memory data storage with mock product data. The application is structured to easily migrate to a real backend API, with query client setup using TanStack React Query for future API integration.

## Backend Architecture
The backend is built with Express.js and TypeScript, providing a foundation for API endpoints. It includes:
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)
- **User Management**: Basic user schema and CRUD operations
- **Development Setup**: Vite integration for hot module replacement in development

## Database Schema
Uses Drizzle ORM with PostgreSQL configuration:
- **Users Table**: Basic user authentication schema with username/password
- The schema is designed to be easily extended for additional e-commerce entities like products, orders, and reviews

## Styling and Design System
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Bootstrap 5**: Component library for responsive grid system and UI components
- **shadcn/ui**: Modern component library built on Radix UI primitives
- **CSS Variables**: Custom design tokens for consistent theming
- **Font Integration**: Inter font family for modern typography

## Development Workflow
- **Vite**: Fast build tool and development server with HMR
- **TypeScript**: Full type safety across frontend and backend
- **ESM Modules**: Modern JavaScript module system
- **Development Tooling**: Integrated error handling and logging

# External Dependencies

## UI and Styling Libraries
- **React**: Frontend framework (v18+)
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Bootstrap**: Responsive component library
- **shadcn/ui**: Modern component system built on Radix UI
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## State Management and Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form handling and validation
- **Wouter**: Lightweight client-side routing

## Backend and Database
- **Express.js**: Web application framework
- **Drizzle ORM**: Type-safe database toolkit
- **PostgreSQL**: Primary database (via Neon serverless)
- **Zod**: Schema validation

## Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast bundling for production
- **PostCSS**: CSS processing with Autoprefixer

## Utilities and Helpers
- **clsx**: Conditional CSS class composition
- **class-variance-authority**: CSS variant management
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation