import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import { useGame } from './utils/useGame'

function optimizeSize2(width: number, height: number, num: number): number {
  let x = Math.min(width, height)
  for (x = Math.max(width, height); x > 0; x--) {
    const numRow = Math.floor(height / x)
    const numCol = Math.floor(width / x)
    if (numRow * numCol > num) {
      break
    }
  }
  return x - 20
}

function App() {
  const { state, start, handleOpen, isOpen } = useGame()
  const [size, setSize] = useState(1)
  const containerDiv = useRef(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const lvlString = queryParams.get('lvl')

    const lvl = parseInt(lvlString || '26') || 26
    start(lvl)
  }, [])

  useEffect(() => {
    const container = containerDiv.current

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect
        const windowHeight = window.innerHeight - 50
        const maxSize = optimizeSize2(width, windowHeight, state.length)
        setSize(maxSize)
      }
    })

    if (container) resizeObserver.observe(container)

    // Cleanup
    return () => {
      if (container) resizeObserver.unobserve(container)
    }
  }, [state.length])

  return (
    <div
      ref={containerDiv}
      className='min-h-screen flex flex-wrap pt-12 pb-12 mx-auto justify-around align-top overflow-visible'
    >
      {state.map((cell) => (
        <Card
          key={`${cell.idx}--${cell.val}`}
          isOpen={isOpen(cell.idx)}
          onFlip={() => handleOpen(cell.idx)}
          content={cell.val}
          size={size}
        />
      ))}
    </div>
  )
}

export default App
