# EgyBook Landing Page

A modern and responsive landing page for EgyBook, built with Next.js, Chakra UI, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** 
  - Chakra UI for components
  - Tailwind CSS for utility classes
- **Icons:** React Icons
- **Image Optimization:** Next.js Image Component

## Project Structure

```
app/
├── components/
│   ├── HeroSection
│   ├── MostRelevantSection
│   ├── WhySection
│   ├── DiscoverSection
│   ├── Trending
│   ├── CTA
│   ├── Footer
│   └── Navbar
├── constants/
│   └── index.js        # Theme colors, navigation links, layout tokens
├── context/
│   └── AuthContext.js  # Authentication context
└── page.jsx            # Main landing page
```

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the landing page

## Features

- Responsive design for all screen sizes
- Modern UI with Chakra components
- Image optimization and lazy loading
- Interactive search and booking interface
- Authentication context for user state
- Consistent theming with custom color palette

## Styling System

- **Theme Colors:** Custom bronze and gold palette
- **Spacing:** 8-point grid system
- **Components:** Chakra UI with custom styling
- **Utilities:** Tailwind CSS for rapid development
