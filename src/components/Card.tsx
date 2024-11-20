import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import background from '../assets/background.png'

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
        containerClassName='w-20 h-20 cursor-pointer mx-1 my-1'
      >
        <div className='absolute w-full h-full flex items-center justify-center border-2 rounded-lg'>
          <img style={{ maxWidth: '40%' }} src={background} alt='background' />
        </div>
        <div className='absolute w-full h-full flex items-center justify-center border-2 rounded-lg'>
          <img style={{ maxWidth: '75%' }} src={image} alt={content} />
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default Card
