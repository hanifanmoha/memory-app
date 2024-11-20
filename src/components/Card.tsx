import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

type ICard = {
  content: string
  isOpen: boolean
  onFlip: () => void
}

function Card({ isOpen, onFlip, content }: ICard) {
  const [image, setImage] = useState<any>(null)

  useEffect(() => {
    import(`../assets/${content}.png`).then((image) => {
      setImage(image.default)
    })
  }, [])

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
        <div className='absolute w-full h-full flex items-center justify-center border-2 rounded-lg'>
          <p></p>
        </div>
        <div className='absolute w-full h-full flex items-center justify-center border-2 rounded-lg p-2'>
          <img src={image} alt={content} />
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default Card
