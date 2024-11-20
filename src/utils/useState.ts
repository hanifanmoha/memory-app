import { useState } from 'react'

const images = [
  'bee',
  'butterfly',
  'chameleon',
  'crab',
  'cricket',
  'crocodile',
  'ducky',
  'dragon',
  'elephant',
  'fox',
  'frog',
  'giraffe',
  'jellyfish',
  'koala',
  'octopus',
  'owl',
  'penguin',
  'praying-mantis',
  'rabbit',
  'rhinoceros-beetle',
  'shark',
  'snail',
  'snake',
  'spider',
  'stingray',
  'whale',
]

const LVL = 26

const problems = [...images.slice(0, LVL), ...images.slice(0, LVL)].sort(
  () => Math.random() - 0.5
)

interface IState {
  val: string
  isSolved: boolean
  idx: number
}

function initializeState(problems: string[]): IState[] {
  return problems.map((val, idx) => ({ val, idx, isSolved: false }))
}

export function useGame() {
  const [state, setState] = useState(initializeState(problems))
  const [pair, setPair] = useState<number[]>([])
  const [count, setCount] = useState(0)

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
      setState(state)
      setPair([])
    } else {
      setTimeout(() => setPair([]), 1000)
    }
  }

  function isOpen(idx: number) {
    return pair.includes(idx) || state[idx].isSolved
  }

  return { state, handleOpen, isOpen }
}
