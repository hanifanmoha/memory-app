import ReactCardFlip from 'react-card-flip'

type ICard = {
  content: string
  isOpen: boolean
  onFlip: () => void
}

function Card({ isOpen, onFlip, content }: ICard) {
  function handleClick() {
    if (isOpen) return
    onFlip()
  }

  return (
    <div onClick={handleClick}>
      <ReactCardFlip
        isFlipped={isOpen}
        containerClassName='w-32 h-32 cursor-pointer mx-1 my-1'
      >
        <div className='absolute w-full h-full bg-blue-500 text-white flex items-center justify-center border-2 rounded-lg'>
          <p>Back</p>
        </div>
        <div className='absolute w-full h-full bg-blue-500 text-white flex items-center justify-center border-2 rounded-lg'>
          <p>{content}</p>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default Card
