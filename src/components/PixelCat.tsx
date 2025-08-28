import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import TunaCanManager from './TunaCanManager'

interface Position {
  x: number
  y: number
}

const PixelCat = () => {
  const { t } = useTranslation()
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isMoving, setIsMoving] = useState(false)
  const [isUserControlled, setIsUserControlled] = useState(false)
  const [scale, setScale] = useState(1) // Scale factor for cat size
  const [tunasEaten, setTunasEaten] = useState(0) // Number of tunas eaten
  const [speedFactor, setSpeedFactor] = useState(1) // Speed factor (1 = normal, lower = slower)
  const catRef = useRef<HTMLDivElement>(null)
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate current cat size based on tunas eaten
  const getCurrentCatSize = () => {
    const baseWidth = 60
    const baseHeight = 48
    const currentWidth = Math.floor(baseWidth * scale)
    const currentHeight = Math.floor(baseHeight * scale)
    return { width: currentWidth, height: currentHeight }
  }

  // Reset cat to original size and speed
  const resetCatSize = () => {
    setScale(1)
    setTunasEaten(0)
    setSpeedFactor(1)
    console.log('Cat reset to original size! 🐱')
  }

  const walkToPosition = (targetX: number, isFast = false) => {
    if (walkIntervalRef.current) {
      clearInterval(walkIntervalRef.current)
    }

    // Speed based on speedFactor (decreases with each tuna eaten)
    const baseStepSize = isFast ? 3 : 1
    const baseWalkSpeed = isFast ? 20 : 120
    
    const stepSize = Math.max(0.5, baseStepSize * speedFactor)
    const walkSpeed = Math.max(10, baseWalkSpeed / speedFactor)
    
    setIsMoving(true)
    
    walkIntervalRef.current = setInterval(() => {
      setPosition(prev => {
        const currentX = prev.x
        const distance = Math.abs(targetX - currentX)
        
        // Check if we've reached the target
        if (distance <= stepSize) {
          setIsMoving(false)
          if (walkIntervalRef.current) {
            clearInterval(walkIntervalRef.current)
          }
          // Resume random movement after reaching target
          if (isUserControlled) {
            setTimeout(() => {
              setIsUserControlled(false)
            }, 2000)
          }
          return { x: targetX, y: prev.y }
        }
        
        // Determine direction and move
        const walkDirection = targetX > currentX ? 'right' : 'left'
        setDirection(walkDirection)
        console.log(`Moving ${walkDirection}, from ${currentX} to ${targetX}`)
        
        const nextX = walkDirection === 'right' 
          ? Math.min(currentX + stepSize, targetX)
          : Math.max(currentX - stepSize, targetX)
        
        return { x: nextX, y: prev.y }
      })
    }, walkSpeed)
  }

  const handleMouseClick = (event: MouseEvent) => {
    const catSize = getCurrentCatSize()
    const targetX = Math.max(0, Math.min(event.clientX - catSize.width / 2, window.innerWidth - catSize.width))
    setIsUserControlled(true)
    
    // Clear random movement timeout
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current)
    }
    
    walkToPosition(targetX, true)
  }

  useEffect(() => {
    const moveRandomly = () => {
      if (isUserControlled) return

      const windowWidth = window.innerWidth
      const catSize = getCurrentCatSize()

      const newX = Math.random() * (windowWidth - catSize.width)
      walkToPosition(newX)

      moveTimeoutRef.current = setTimeout(moveRandomly, Math.random() * 5000 + 4000)
    }

    const initialDelay = setTimeout(moveRandomly, 2000)

    // Add mouse click event listener
    document.addEventListener('click', handleMouseClick)

    return () => {
      clearTimeout(initialDelay)
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current)
      }
      document.removeEventListener('click', handleMouseClick)
    }
  }, [])

  // Restart random movement when user control ends
  useEffect(() => {
    if (!isUserControlled) {
      const resumeRandomMovement = () => {
        const windowWidth = window.innerWidth
        const catSize = getCurrentCatSize()
        const newX = Math.random() * (windowWidth - catSize.width)
        walkToPosition(newX)
        
        moveTimeoutRef.current = setTimeout(() => {
          const moveRandomly = () => {
            if (isUserControlled) return
            const currentCatSize = getCurrentCatSize()
            const newX = Math.random() * (windowWidth - currentCatSize.width)
            walkToPosition(newX)
            moveTimeoutRef.current = setTimeout(moveRandomly, Math.random() * 5000 + 4000)
          }
          moveRandomly()
        }, Math.random() * 5000 + 4000)
      }
      
      const delay = setTimeout(resumeRandomMovement, 1000)
      return () => clearTimeout(delay)
    }
  }, [isUserControlled])

  return (
    <>
      {/* Reset Button */}
      <button
        onClick={resetCatSize}
        className="cat-reset-button"
        title={t('cat.resetButtonTitle')}
      >
        {t('cat.resetButton')}
      </button>
      
      {/* Cat Status Display */}
      <div className="cat-status">
        <span>🐱 {t('cat.status.tunas')}: {tunasEaten}</span>
        <span>📏 {t('cat.status.size')}: {Math.round(scale * 100)}%</span>
        <span>⚡ {t('cat.status.speed')}: {Math.round(speedFactor * 100)}%</span>
      </div>

      <div
        ref={catRef}
        className={`pixel-cat ${direction} ${isMoving ? 'moving' : 'idle'}`}
        style={{
          left: `${position.x}px`,
          width: `${getCurrentCatSize().width}px`,
          height: `${getCurrentCatSize().height}px`,
        }}
      >
        <img 
          src="/images/blackcat.png" 
          alt="Pixel Cat" 
          className="cat-image"
          draggable={false}
          style={{
            width: `${getCurrentCatSize().width}px`,
            height: `${getCurrentCatSize().height}px`,
          }}
        />
      </div>
      <TunaCanManager 
        catPosition={{ x: position.x, y: position.y }}
        catSize={getCurrentCatSize()}
        onCatEatTuna={() => {
          setTunasEaten(prev => prev + 1)
          setScale(prev => Math.min(prev + 0.05, 2)) // Max size is 2x, increase by 5% each tuna
          setSpeedFactor(prev => Math.max(prev - 0.03, 0.3)) // Decrease speed by 3% each tuna, min 30% of original speed
          console.log(`Cat ate tuna! 🐱 Total eaten: ${tunasEaten + 1}, Scale: ${scale + 0.05}, Speed: ${speedFactor - 0.03}`)
        }}
      />
    </>
  )
}

export default PixelCat