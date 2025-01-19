import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import { useGame } from './utils/useGame'
import congrats from './assets/new-product.png'
import CONST from './utils/constants'
import PopUp from './components/PopUp'

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

function getLevel() {
  const queryParams = new URLSearchParams(window.location.search)
  const lvlString = queryParams.get('lvl')
  const lvl = parseInt(lvlString || '26') || CONST.MAX_LEVEL
  return lvl
}

function setLevel(lvl: number) {
  const params = new URLSearchParams(window.location.search);
  params.set('lvl', lvl + '')
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl)
}

function App() {

  const { state, isFinished, start, handleOpen, isOpen, isSolved } = useGame()
  const [lvl, setLvl] = useState(getLevel())
  const [size, setSize] = useState(1)
  const containerDiv = useRef(null)

  useEffect(() => {
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

  function restart(lvl: number) {
    start(lvl)
    setLvl(lvl)
    setLevel(lvl)
  }

  return (
    <div
      ref={containerDiv}
      className='min-h-screen flex flex-wrap pt-12 pb-12 mx-auto justify-around align-top overflow-visible'
    >
      {state.map((cell) => (
        <Card
          key={`${cell.idx}--${cell.val}`}
          isOpen={isOpen(cell.idx)}
          isSolved={isSolved(cell.idx)}
          onFlip={() => handleOpen(cell.idx)}
          content={cell.val}
          size={size}
        />
      ))}

      <PopUp key={`${lvl}-${isFinished}`} onRestart={restart} isOpen={isFinished} lvl={lvl} />
    </div>
  )
}

export default App
