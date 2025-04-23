# LinkHub - Dashboard for Your Favorite Websites

LinkHub is a beautiful dashboard website that allows users to organize and access their favorite websites. It features user authentication, categorized links, and a clean, intuitive interface.

## Features

- User authentication (sign up, sign in, sign out)
- Dashboard with categorized sections for different types of links
- Add, edit, and delete personal links
- Search functionality to quickly find saved links
- Responsive design for all device sizes
- Backend integration with Supabase for data storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials
4. Connect to Supabase using the "Connect to Supabase" button in the top right
5. Start the development server
   ```
   npm run dev
   ```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/context` - React context for state management
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility libraries and services
- `/src/pages` - Main application pages
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions and constants
- `/supabase/migrations` - SQL migrations for Supabase

## Built With

- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Supabase for backend and authentication
- Lucide React for icons