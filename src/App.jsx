import { useState, useEffect, useCallback } from 'react'
import SwipeCard from './components/SwipeCard'
import Summary from './components/Summary'
import './App.css'

// Fetch and cache cat images as blob URLs
const generateCatImages = async () => {
  const cats = []
  const promises = []
  
  for (let i = 1; i <= 15; i++) {
    const promise = fetch(`https://cataas.com/cat?width=400&height=600`)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        return {
          id: i,
          url: blobUrl,
          liked: false
        }
      })
      .catch(error => {
        console.error('Error loading cat image:', error)
        return {
          id: i,
          url: 'https://cataas.com/cat?width=400&height=600',
          liked: false
        }
      })
    promises.push(promise)
  }
  
  return Promise.all(promises)
}

function App() {
  const [cats, setCats] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    console.log('useEffect running')
    const loadCats = async () => {
      const catData = await generateCatImages()
      console.log('Generated cats:', catData.length)
      setCats(catData)
      setIsLoading(false)
      console.log('Loading set to false')
    }
    loadCats()
  }, [])

  const handleSwipe = useCallback((direction, catId) => {
    console.log('=== SWIPE START ===')
    console.log('Direction:', direction, 'Cat ID:', catId, 'Current Index:', currentIndex)
    console.log('Current cat at index', currentIndex, ':', cats[currentIndex])
    
    // Prevent multiple swipes during transition
    if (isTransitioning) {
      console.log('Swipe blocked - already transitioning')
      return
    }
    
    setIsTransitioning(true)
    
    // Update the cat's liked status if swiped right using the catId
    if (direction === 'right') {
      console.log('Marking cat with id', catId, 'as liked')
      setCats(prev => {
        const newCats = prev.map((cat) => 
          cat.id === catId ? { ...cat, liked: true } : cat
        )
        const likedCat = newCats.find(c => c.id === catId)
        console.log('Cat that was marked as liked:', likedCat)
        console.log('All liked cats:', newCats.filter(c => c.liked).map(c => ({ id: c.id, url: c.url })))
        return newCats
      })
    }
    
    // Move to next cat or show summary
    if (currentIndex < cats.length - 1) {
      console.log('Moving to next cat, new index will be:', currentIndex + 1)
      setCurrentIndex(prev => prev + 1)
    } else {
      console.log('Last cat swiped, showing summary')
      setShowSummary(true)
    }
    
    console.log('=== SWIPE END ===')
    
    // Reset transitioning after a delay
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [currentIndex, cats, isTransitioning])

  const handleRestart = async () => {
    setIsLoading(true)
    const newCats = await generateCatImages()
    setCats(newCats)
    setCurrentIndex(0)
    setShowSummary(false)
    setIsTransitioning(false)
    setIsLoading(false)
  }

  console.log('App rendering, isLoading:', isLoading, 'cats:', cats.length)

  if (isLoading) {
    console.log('Showing loading state')
    return (
      <div className="app loading">
        <div className="loader">
          <div className="cat-loader">🐱</div>
          <p>Loading adorable cats...</p>
        </div>
      </div>
    )
  }

  if (showSummary) {
    return <Summary cats={cats} onRestart={handleRestart} />
  }

  console.log('Showing main app')
  return (
    <div className="app">
      <header className="app-header">
        <h1>Paws & Preferences</h1>
        <p>Find Your Favourite Kitty</p>
        <div className="progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentIndex + 1) / cats.length) * 100}%` }}
          ></div>
        </div>
        <span className="counter">{currentIndex + 1} / {cats.length}</span>
      </header>
      
      <div className="card-stack">
        {cats.slice(currentIndex, currentIndex + 2).map((cat, index) => (
          <SwipeCard
            key={`${cat.id}-${currentIndex + index}`}
            cat={cat}
            onSwipe={handleSwipe}
            isActive={index === 0}
            zIndex={2 - index}
          />
        ))}
      </div>
      
      <div className="instructions">
        <div className="instruction">
          <span className="swipe-icon left">👈</span>
          <span>Swipe left to pass</span>
        </div>
        <div className="instruction">
          <span className="swipe-icon right">👉</span>
          <span>Swipe right to like</span>
        </div>
      </div>
    </div>
  )
}

export default App
