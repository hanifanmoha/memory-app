import congrats from '../assets/new-product.png'
import CONST from '../utils/constants'

type IPopUp = {
    lvl: number,
    isOpen: boolean,
    moves: number,
    onRestart: (lvl: number) => void
}

function PopUp({ lvl, isOpen, moves, onRestart }: IPopUp) {
    return <div
        style={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'flex' : 'none' }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-white/95">
        <div className="w-full max-w-sm p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center flex flex-col items-center">
                    <img className='w-24 h-24 mb-6' src={congrats} alt='congratulations' />
                    <h3 className="text-gray-600 text-lg mb-2">Yeay you have finished this level!</h3>
                    <p className="text-gray-800 text-2xl font-medium mb-8">Total Moves: {moves}</p>

                    <div className="w-full space-y-3">
                        <button
                            type="button"
                            onClick={() => onRestart(lvl)}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl py-3 px-4 transition-colors"
                        >
                            Restart this level - {lvl}
                        </button>

                        {lvl <= CONST.MAX_LEVEL - 2 && (
                            <button
                                type="button"
                                onClick={() => onRestart(lvl + 2)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors"
                            >
                                Add two level - {lvl + 2}
                            </button>
                        )}

                        {lvl == CONST.MAX_LEVEL - 1 && (
                            <button
                                type="button"
                                onClick={() => onRestart(lvl + 1)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors"
                            >
                                Add one level - {lvl + 1}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PopUp