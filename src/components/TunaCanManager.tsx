import { useState, useEffect, useRef } from 'react'
import TunaCan from './TunaCan'

interface Position {
  x: number
  y: number
}

interface TunaCanData {
  id: string
  position: Position
}

interface TunaCanManagerProps {
  catPosition: Position
  catSize: { width: number; height: number }
  onCatEatTuna?: () => void
}

const TunaCanManager = ({ catPosition, catSize, onCatEatTuna }: TunaCanManagerProps) => {
  const [tunaCans, setTunaCans] = useState<TunaCanData[]>([])
  const spawnTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check collision between cat and tuna cans
  const checkCollisions = () => {
    tunaCans.forEach(tuna => {
      const distance = Math.abs(catPosition.x - tuna.position.x)
      // Distance from cat's edge (center + half width) + 25px fixed distance
      const collisionDistance = (catSize.width / 2) + 25
      if (distance < collisionDistance) {
        handleTunaEaten(tuna.id)
        onCatEatTuna?.()
      }
    })
  }

  const spawnTunaCan = () => {
    const windowWidth = window.innerWidth
    const tunaWidth = 24
    const catWidth = 60
    
    // Generate random position, avoiding cat's current position
    let x: number
    do {
      x = Math.random() * (windowWidth - tunaWidth)
    } while (Math.abs(x - catPosition.x) < catSize.width + 50) // Keep some distance from cat
    
    const newTuna: TunaCanData = {
      id: `tuna-${Date.now()}-${Math.random()}`,
      position: { x, y: 0 }
    }
    
    setTunaCans(prev => [...prev, newTuna])
    
    // Schedule next spawn
    spawnTimeoutRef.current = setTimeout(spawnTunaCan, Math.random() * 15000 + 10000) // 10-25 seconds
  }

  const handleTunaEaten = (id: string) => {
    setTunaCans(prev => prev.filter(tuna => tuna.id !== id))
  }

  useEffect(() => {
    // Start spawning tuna cans after initial delay
    spawnTimeoutRef.current = setTimeout(spawnTunaCan, 5000) // First spawn after 5 seconds
    
    return () => {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    checkCollisions()
  }, [catPosition, catSize, tunaCans])

  return (
    <>
      {tunaCans.map(tuna => (
        <TunaCan
          key={tuna.id}
          id={tuna.id}
          position={tuna.position}
          onEaten={handleTunaEaten}
        />
      ))}
    </>
  )
}

export default TunaCanManager