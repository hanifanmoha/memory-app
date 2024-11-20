import { useState } from 'react'
import Card from './components/Card'
import { randomize } from './utils/util'
import { useGame } from './utils/useState'

function App() {
  // const MAPS = randomize()

  // const [isOpen, setIsOpen] = useState(false)

  // const handleFlip = () => setIsOpen(!isOpen)

  const { state, handleOpen, isOpen } = useGame()

  const numX = 4
  const numY = 4
  const arr = []
  for (let y = 0; y < numY; y++) {
    const row = []
    for (let x = 0; x < numX; x++) {
      const idx = y * numX + x
      row.push(state[idx])
    }
    arr.push(row)
  }

  return (
    <div className='h-screen flex items-center justify-center bg-blue-500 text-white'>
      <div className='flex-col'>
        {arr.map((row, r) => {
          return (
            <div className='flex'>
              {row.map((cell, c) => {
                return (
                  <Card
                    key={`${r}--${c}`}
                    isOpen={isOpen(cell.idx)}
                    onFlip={() => handleOpen(cell.idx)}
                    content={cell.val}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
