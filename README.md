# 🐾 Paws & Preferences: Find Your Favourite Kitty

A delightful mobile-first web application that helps you discover your cat preferences through an intuitive swipe interface, similar to popular dating apps but with adorable cats!

## ✨ Features

- **Swipe Gesture Controls**: Swipe right to like, swipe left to pass
- **Mobile-First Design**: Optimized for touch interfaces and mobile devices
- **Beautiful Animations**: Smooth transitions powered by React Spring
- **Cat API Integration**: Fresh cat images from [Cataas](https://cataas.com/)
- **Progress Tracking**: Visual progress bar and counter
- **Results Summary**: Detailed breakdown of your preferences with liked cats gallery
- **Share Functionality**: Share your results with friends
- **Responsive Design**: Works perfectly on all screen sizes
- **Accessibility**: Supports reduced motion and high contrast preferences

## 🚀 Live Demo

**[View Live Application](https://tate88.github.io/Paws-Preferences/)**

## 📱 How to Use

1. **Start Swiping**: Browse through a curated collection of 15 adorable cats
2. **Express Your Preference**: 
   - Swipe right (👉) or tap the heart to like
   - Swipe left (👈) or tap the X to pass
3. **Track Progress**: Watch the progress bar as you make your way through all cats
4. **View Results**: See your match rate and gallery of liked cats
5. **Share & Restart**: Share your results or start over with new cats

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Animations**: React Spring for smooth gestures and transitions  
- **Gesture Handling**: @use-gesture/react for swipe detection
- **Styling**: Modern CSS with Flexbox and Grid
- **API**: Cataas (Cat as a Service) for cat images
- **Deployment**: GitHub Pages
- **Build Tool**: Vite for fast development and optimized builds

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tate88/Paws-Preferences.git
   cd Cat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Building for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── SwipeCard.jsx      # Individual cat card with swipe gestures
│   ├── SwipeCard.css      # Card styling and animations
│   ├── Summary.jsx        # Results page with liked cats
│   └── Summary.css        # Summary page styling
├── App.jsx               # Main application component
├── App.css              # Global styles and responsive design
└── main.jsx            # React application entry point
```

## 🎨 Design Features

### Mobile-First Approach
- Touch-optimized interface
- Gesture-based navigation
- Responsive breakpoints for all devices
- Optimized for one-handed use

### Visual Design
- Modern gradient backgrounds
- Card-based interface with subtle shadows
- Smooth spring animations
- Progress indicators
- Accessibility-friendly color schemes

### Performance
- Lazy image loading
- Optimized bundle size
- Minimal dependencies
- Fast initial load times

## 🔧 Configuration

### Customizing Cat Collection
Modify the `generateCatImages()` function in `App.jsx` to change:
- Number of cats (default: 15)
- Image dimensions
- API parameters

### Styling Customization
- Global styles: `src/App.css`
- Component styles: `src/components/*.css`
- CSS custom properties for easy theming

## 📖 API Reference

### Cataas API
The app uses the [Cataas (Cat as a Service)](https://cataas.com/) API:

```
https://cataas.com/cat?width=400&height=600
```

**Parameters:**
- `width`: Image width in pixels
- `height`: Image height in pixels  
- Additional random parameter for cache busting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow existing code style and structure
2. Test on multiple devices and browsers
3. Ensure accessibility compliance
4. Add appropriate comments for complex logic
5. Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **[Cataas](https://cataas.com/)** for providing the wonderful cat API
- **React Spring** team for excellent animation library
- **Use Gesture** team for gesture handling
- All the cat lovers who inspired this project! 🐱

---

**Made with ❤️ for cat enthusiasts everywhere**

*Paws & Preferences - Because every cat deserves a chance to steal your heart!*
