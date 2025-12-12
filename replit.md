# Website Prototype Creation

## Overview
A React + Vite frontend website prototype with Tailwind CSS styling. The site appears to be a Russian-language course landing page with pricing and program information.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Animations**: Motion library (Framer Motion)
- **Charts**: Recharts

## Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── figma/       # Figma-derived components
│   │   ├── shared/      # Shared/reusable components
│   │   └── ui/          # shadcn/ui components
│   ├── constants/       # Application constants
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Main CSS file
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `build/` directory)

## Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `build`
