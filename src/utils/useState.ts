import { useState } from 'react'

const problems = [
  'A',
  'A',
  'B',
  'B',
  'C',
  'C',
  'D',
  'D',
  'E',
  'E',
  'F',
  'F',
  'G',
  'G',
  'H',
  'H',
].sort(() => Math.random() - 0.5)

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

  function handleOpen(idx: number) {
    if (pair.length == 0) {
      setPair([idx])
      return
    }
    if (pair.includes(idx)) {
      return
    }
    if (pair.length > 1) {
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
