import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const handleFlip = () => setIsOpen(!isOpen)

  return (
    <div className='h-screen flex items-center justify-center bg-blue-500 text-white'>
      <Card isOpen={isOpen} onFlip={handleFlip} />
    </div>
  )
}

export default App
