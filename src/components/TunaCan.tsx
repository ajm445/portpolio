import { useState } from 'react'

interface Position {
  x: number
  y: number
}

interface TunaCanProps {
  id: string
  position: Position
  onEaten: (id: string) => void
}

const TunaCan = ({ id, position, onEaten }: TunaCanProps) => {
  const [isEaten, setIsEaten] = useState(false)

  const handleEaten = () => {
    setIsEaten(true)
    setTimeout(() => {
      onEaten(id)
    }, 500) // Wait for animation to complete
  }

  return (
    <div
      className={`tuna-can ${isEaten ? 'disappearing' : ''}`}
      style={{
        left: `${position.x}px`,
        bottom: '20px'
      }}
      data-tuna-id={id}
      onClick={handleEaten}
    >
      <img 
        src="/images/tunacan.png" 
        alt="Tuna Can" 
        className="tuna-can-image"
        draggable={false}
      />
    </div>
  )
}

export default TunaCan