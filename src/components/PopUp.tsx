import congrats from '../assets/new-product.png'
import CONST from '../utils/constants'

type IPopUp = {
    lvl: number,
    isOpen: boolean,
    moves: number,
    onRestart: (lvl: number) => void,
    onClose: () => void
}

function PopUp({ lvl, isOpen, moves, onRestart, onClose }: IPopUp) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/95">
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
                                className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-medium rounded-xl py-4 px-4 transition-colors text-lg"
                            >
                                Restart this level - {lvl}
                            </button>

                            {lvl <= CONST.MAX_LEVEL - 2 && (
                                <button
                                    type="button"
                                    onClick={() => onRestart(lvl + 2)}
                                    className="w-3/4 bg-[#d97706] hover:bg-[#b45309] text-white font-medium rounded-xl py-3 px-4 transition-colors"
                                >
                                    Add two level - {lvl + 2}
                                </button>
                            )}

                            {lvl == CONST.MAX_LEVEL - 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRestart(lvl + 1)}
                                    className="w-3/4 bg-[#d97706] hover:bg-[#b45309] text-white font-medium rounded-xl py-3 px-4 transition-colors"
                                >
                                    Add one level - {lvl + 1}
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-3/4 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-xl py-3 px-4 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp