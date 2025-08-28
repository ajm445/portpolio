import { useState, useEffect, useRef } from 'react'

interface Position {
  x: number
  y: number
}

const PixelCat = () => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isMoving, setIsMoving] = useState(false)
  const [isUserControlled, setIsUserControlled] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const walkToPosition = (targetX: number, isFast = false) => {
    if (walkIntervalRef.current) {
      clearInterval(walkIntervalRef.current)
    }

    const stepSize = isFast ? 2 : 1
    const walkSpeed = isFast ? 40 : 80
    
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
        
        const nextX = walkDirection === 'right' 
          ? Math.min(currentX + stepSize, targetX)
          : Math.max(currentX - stepSize, targetX)
        
        return { x: nextX, y: prev.y }
      })
    }, walkSpeed)
  }

  const handleMouseClick = (event: MouseEvent) => {
    const targetX = Math.max(0, Math.min(event.clientX - 24, window.innerWidth - 48))
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
      const catSize = 48

      const newX = Math.random() * (windowWidth - catSize)
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
        const catSize = 48
        const newX = Math.random() * (windowWidth - catSize)
        walkToPosition(newX)
        
        moveTimeoutRef.current = setTimeout(() => {
          const moveRandomly = () => {
            if (isUserControlled) return
            const newX = Math.random() * (windowWidth - catSize)
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
    <div
      ref={catRef}
      className={`pixel-cat ${direction} ${isMoving ? 'moving' : 'idle'}`}
      style={{
        left: `${position.x}px`,
      }}
    >
      <div className="cat-sprite">
        <div className="cat-body"></div>
      </div>
    </div>
  )
}

export default PixelCat