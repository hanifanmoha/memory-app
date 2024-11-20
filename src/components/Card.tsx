import cx from 'classnames'
import styles from './Card.module.css'

type ICard = {
  isOpen: boolean
  onFlip: () => void
}

function Card({ isOpen, onFlip }: ICard) {
  return (
    <div
      className={cx('relative w-32 h-32 cursor-pointer', styles.perspective)}
      onClick={onFlip}
    >
      <div
        className={cx(
          'relative w-full h-full transition-transform duration-700 transform',
          { [styles.rotateY180]: isOpen }
        )}
      >
        <div
          className={cx(
            'absolute w-full h-full bg-blue-500 text-white flex items-center justify-center border-2 rounded-lg',
            styles.backfaceHidden
          )}
        >
          <p>Back</p>
        </div>
        <div
          className={cx(
            'absolute w-full h-full bg-green-500 text-white flex items-center justify-center border-2 rounded-lg',
            styles.backfaceHidden,
            styles.rotateY180
          )}
        >
          <p>Front</p>
        </div>
      </div>
    </div>
  )
}

export default Card
