# Sahayak Frontend - Next.js

This is the modern Next.js frontend for the Sahayak job portal application.

## Features

- 🎨 Modern, clean, and artistic UI design
- 📱 Fully responsive design for all devices
- ⚡ Fast performance with Next.js App Router
- 🎭 Smooth animations and transitions
- 🔍 Real-time job search functionality
- 💼 Job creation and management
- 🗺️ Interactive Google Maps integration
- 🎯 AI-powered job matching via backend API

## Tech Stack

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **React 19** - Latest React features

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Flask backend running on http://localhost:5000

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (or use the existing one):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page with job search
│   ├── layout.tsx           # Root layout with header/footer
│   ├── jobs/
│   │   ├── [id]/            # Job detail page
│   │   └── create/          # Job creation page
│   └── profile/             # User profile page
├── components/              # Reusable React components
│   ├── Header.tsx          # Navigation header
│   └── JobCard.tsx         # Job listing card
├── lib/                    # Utility libraries
│   └── api.ts              # API client for Flask backend
├── types/                  # TypeScript type definitions
│   └── index.ts           # Job and API types
└── public/                # Static assets
```

## Pages

### Home (`/`)
- Job search interface with real-time results
- Display all jobs or filtered results
- AI-powered semantic search via backend
- Feature highlights section

### Job Detail (`/jobs/[id]`)
- Detailed job information
- Employer contact details
- Interactive Google Maps location
- Call-to-action button

### Create Job (`/jobs/create`)
- Form to post new jobs
- Category selection
- Form validation
- Success/error handling

### Profile (`/profile`)
- View jobs by employer name
- Manage and delete own jobs
- Job statistics

## API Integration

The frontend communicates with the Flask backend via REST API:

- `GET /api/jobs` - Fetch all jobs or search
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create new job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/profile/:name` - Get employer jobs

## Design Highlights

- **Gradient backgrounds** - Blue, purple, and pink gradients for visual appeal
- **Modern cards** - Rounded corners, shadows, and hover effects
- **Smooth animations** - Scale, fade, and transition effects
- **Emoji icons** - Friendly and accessible visual elements
- **Responsive layout** - Works seamlessly on mobile, tablet, and desktop
- **Professional typography** - Inter font for clean readability

## Deployment

To deploy the frontend:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The app will be available on port 3000 by default.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: http://localhost:5000/api)

## License

Same as the main Sahayak project.
