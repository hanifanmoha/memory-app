import Card from './components/Card'
import { useGame } from './utils/useState'

function App() {
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
    <div className='max-w-md min-h-screen flex flex-wrap pt-12 pb-12 mx-auto justify-between align-top'>
      {state.map((cell) => (
        <Card
          key={`${cell.idx}--${cell.val}`}
          isOpen={isOpen(cell.idx)}
          onFlip={() => handleOpen(cell.idx)}
          content={cell.val}
        />
      ))}
    </div>
  )
}

export default App
