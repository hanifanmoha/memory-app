import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import { useGame } from './utils/useGame'
import CONST from './utils/constants'
import PopUp from './components/PopUp'
import RestartPopUp from './components/RestartPopUp'

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
  const lvlString = queryParams.get(CONST.LVL_STRING)
  const lvl = parseInt(lvlString || String(CONST.DEFAULT_LEVEL)) || CONST.DEFAULT_LEVEL
  return lvl
}

function setLevel(lvl: number) {
  const params = new URLSearchParams(window.location.search);
  params.set(CONST.LVL_STRING, lvl + '')
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl)
}

function App() {
  const { state, isFinished, start, handleOpen, isOpen, isSolved, moves, matchedPairs } = useGame()
  const [lvl, setLvl] = useState(getLevel())
  const [size, setSize] = useState(1)
  const containerDiv = useRef(null)
  const [showRestartPopup, setShowRestartPopup] = useState(false)
  const [showFinishPopup, setShowFinishPopup] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  useEffect(() => {
    if (state.length > 0 && isFinished) {
      setShowFinishPopup(true)
    }
  }, [isFinished, state.length])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function restart(lvl: number) {
    start(lvl)
    setLvl(lvl)
    setLevel(lvl)
    setShowRestartPopup(false)
    setShowFinishPopup(false)
  }

  const handleStatsClick = () => {
    if (isFinished) {
      // If game is finished, show the completion popup
      setShowFinishPopup(true)
    } else {
      // If game is not finished, show the restart confirmation popup
      setShowRestartPopup(true)
    }
  }

  const handleRestartConfirm = () => {
    restart(lvl) // Restart with current level
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Stats Panel */}
      <div className="w-full flex justify-center p-4">
        <div className="w-1/2 max-w-4xl flex justify-between gap-4">
          <div
            onClick={handleStatsClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-lg p-4 cursor-pointer transition-colors"
          >
            <h2 className="text-gray-700 text-lg font-medium">Pairs matched</h2>
            <p className="text-4xl font-bold">{matchedPairs}/{state.length / 2}</p>
          </div>
          <div
            onClick={handleStatsClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-lg p-4 cursor-pointer transition-colors"
          >
            <h2 className="text-gray-700 text-lg font-medium">Total moves</h2>
            <p className="text-4xl font-bold">{moves}</p>
          </div>
        </div>
      </div>

      {!isOnline && (
        <div className="w-full bg-yellow-100 text-yellow-800 px-4 py-2 text-center">
          You are currently offline. The game will continue to work, but some features may be limited.
        </div>
      )}

      {/* Game Grid */}
      <div
        ref={containerDiv}
        className='flex flex-wrap pt-4 pb-12 mx-auto justify-around align-top overflow-visible'
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
      </div>

      <PopUp
        key={`${lvl}-${isFinished}`}
        onRestart={restart}
        isOpen={showFinishPopup}
        lvl={lvl}
        moves={moves}
        onClose={() => setShowFinishPopup(false)}
      />

      <RestartPopUp
        isOpen={showRestartPopup}
        onClose={() => setShowRestartPopup(false)}
        onRestart={handleRestartConfirm}
      />
    </div>
  )
}

export default App
