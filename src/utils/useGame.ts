import { useMemo, useState } from 'react'
import CONST from './constants'

const images = [
  'bat',
  'bee',
  'butterfly',
  'chameleon',
  'clouds',
  'crab',
  'cricket',
  'crocodile',
  'dinosaur',
  'dragon',
  'ducky',
  'earth',
  'elephant',
  'flower',
  'forest',
  'fox',
  'frog',
  'giraffe',
  'jellyfish',
  'koala',
  'monkey',
  'moon',
  'octopus',
  'owl',
  'peacock',
  'penguin',
  'praying-mantis',
  'rabbit',
  'rhinoceros-beetle',
  'river',
  'shark',
  'snail',
  'snake',
  'spider',
  'stingray',
  'storm',
  'sun',
  'turtle',
  'whale',
  'wolf'
]

interface IState {
  val: string
  isSolved: boolean
  idx: number
}

function initializeState(problems: string[]): IState[] {
  return problems.map((val, idx) => ({ val, idx, isSolved: false }))
}

export function useGame() {
  const [state, setState] = useState(initializeState([]))
  const [pair, setPair] = useState<number[]>([])
  const [count, setCount] = useState(0)

  function start(lvl: number = CONST.MAX_LEVEL) {
    if (lvl > CONST.MAX_LEVEL) {
      lvl = CONST.MAX_LEVEL
    }
    const randomizeImages = images.sort(() => Math.random() - 0.5)
    const problems = [
      ...randomizeImages.slice(0, lvl),
      ...randomizeImages.slice(0, lvl),
    ].sort(() => Math.random() - 0.5)
    const newState = initializeState(problems)
    setState(newState)
    setCount(0)
  }

  function handleOpen(idx: number) {
    if (pair.includes(idx)) {
      return
    }
    if (pair.length > 1) {
      return
    }

    setCount(count + 1)

    if (pair.length == 0) {
      setPair([idx])
      return
    }

    const newPair = [...pair, idx]
    setPair(newPair)

    // Check if match
    if (state[newPair[0]].val === state[newPair[1]].val) {
      state[newPair[0]].isSolved = true
      state[newPair[1]].isSolved = true
      setState([...state])
      setPair([])
    } else {
      setTimeout(() => setPair([]), 1000)
    }
  }

  function isOpen(idx: number) {
    return pair.includes(idx) || state[idx].isSolved
  }

  function isSolved(idx: number) {
    return state[idx].isSolved
  }


  const isFinished = useMemo(() => {
    for (let card of state) {
      if (!card.isSolved) {
        console.log('IS FINISHED = FALSE', state)
        return false
      }
    }
    return true
  }, [state])

  const moves = count
  const matchedPairs = state.length / 2 - (state.filter(card => !card.isSolved).length) / 2

  return { state, isFinished, start, handleOpen, isOpen, isSolved, moves, matchedPairs }
}
