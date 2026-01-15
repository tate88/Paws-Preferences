# 🐾 Paws & Preferences - Development Guide

## Project Overview
A mobile-first React web application for discovering cat preferences through swipe gestures. Users swipe through cat images and get a summary of their preferences.

## Key Features
- Swipe gesture controls (left=dislike, right=like)
- Mobile-optimized responsive design
- React Spring animations
- Cataas API integration
- GitHub Pages deployment ready

## Tech Stack
- React 19 + Vite
- @react-spring/web for animations
- @use-gesture/react for gesture handling
- Modern CSS with mobile-first approach
- GitHub Pages deployment

## Development
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run deploy` - Deploy to GitHub Pages
- Local development URL: http://localhost:5173/Cat/

## Project Structure
- `src/App.jsx` - Main application logic and state management
- `src/components/SwipeCard.jsx` - Individual cat card with swipe gestures
- `src/components/Summary.jsx` - Results/summary page component
- CSS files for responsive styling and animations

## Notes
- Optimized for mobile touch interfaces
- Uses 15 cat images from Cataas API
- Includes accessibility features (reduced motion, high contrast)
- Ready for GitHub Pages deployment with proper base path configuration