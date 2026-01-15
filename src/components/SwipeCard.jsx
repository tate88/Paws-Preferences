import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import './SwipeCard.css'
    import { useEffect } from 'react'
const SwipeCard = ({ cat, onSwipe, isActive, zIndex }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  // Capture cat ID to prevent it from changing during swipe
  const catIdRef = cat.id
  
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { friction: 50, tension: 800 }
  }))

    // Reset spring and dragOffset when a new card becomes active

    useEffect(() => {
      if (isActive) {
        api.start({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          immediate: true
        })
        setDragOffset({ x: 0, y: 0 })
      }
    }, [isActive, api])

  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [xDir], distance, cancel, canceled }) => {
      if (!isActive || canceled) return

      const trigger = Math.abs(mx) > 80
      const dir = mx < 0 ? 'left' : 'right'
      
      if (!active && trigger) {
        console.log('Swipe triggered! Direction:', dir, 'Cat ID:', catIdRef, 'Movement:', mx)
        
        // Immediately call onSwipe to prevent any timing issues
        onSwipe(dir, catIdRef)
        
        // Then animate card off screen
        cancel()
        api.start({ 
          x: dir === 'left' ? -window.innerWidth : window.innerWidth, 
          y: my,
          rotate: dir === 'left' ? -30 : 30,
          scale: 0.8,
          config: { friction: 50, tension: 200 }
        })
        return
      }
      
      // Update spring values during drag
      api.start({
        x: active ? mx : 0,
        y: active ? my : 0,
        rotate: active ? mx / 10 : 0,
        scale: active ? 1.05 : 1,
        immediate: active
      })
      
      setDragOffset({ x: mx, y: my })
    },
    {
      axis: undefined, // Allow dragging in any direction
      bounds: { left: -400, right: 400, top: -300, bottom: 300 }, // Increased bounds
      rubberband: 0.2, // Reduced rubberband effect
      threshold: 5, // Minimum movement to start drag
      preventDefaultConditions: (event) => event.touches && event.touches.length > 1
    }
  )

  // Calculate like/dislike indication based on drag
  const getLikeIndicator = () => {
    const threshold = 50
    if (dragOffset.x > threshold) return 'like'
    if (dragOffset.x < -threshold) return 'dislike'
    return null
  }

  const indicator = getLikeIndicator()

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex,
        touchAction: 'none'
      }}
      className={`swipe-card ${isActive ? 'active' : ''}`}
    >
      <div className="card-content">
        <img 
          src={cat.url} 
          alt="Adorable cat" 
          draggable={false}
          onLoad={(e) => {
            // Add a subtle fade-in when image loads
            e.target.style.opacity = '1'
          }}
          style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
        />
        
        {indicator && (
          <div className={`like-indicator ${indicator}`}>
            {indicator === 'like' ? '❤️ LIKE' : '💔 PASS'}
          </div>
        )}
        
        <div className="card-overlay">
          <div className="gradient"></div>
        </div>
      </div>
    </animated.div>
  )
}

export default SwipeCard