import congrats from '../assets/new-product.png'
import CONST from '../utils/constants'

type IPopUp = {
    lvl: number,
    isOpen: boolean,
    moves: number,
    onRestart: (lvl: number) => void
}

function PopUp({ lvl, isOpen, moves, onRestart }: IPopUp) {
    // TODO: Fix transition
    return <div
        style={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'flex' : 'none' }}
        className="overflow-y-auto overflow-x-hidden fixed flex top-0 right-auto left-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-50/90 transition-opacity duration-1000">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow border-2 text-center">
                <div className="px-8 py-12 text-center flex flex-col items-center">
                    <img className='w-1/3 mb-8' src={congrats} alt='background' />
                    <h3 className="mb-2 text-lg font-normal text-gray-500">Yeay you have finished this level!</h3>
                    <p className="mb-8 text-2xl font-semibold text-gray-700">Total Moves: {moves}</p>
                    <button
                        type="button"
                        onClick={() => onRestart(lvl)}
                        className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
                    >
                        Restart this level - {lvl}
                    </button>
                    {lvl <= CONST.MAX_LEVEL - 2 && <button
                        type="button"
                        onClick={() => onRestart(lvl + 2)}
                        className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add two level - {lvl + 2}
                    </button>}
                    {lvl == CONST.MAX_LEVEL - 1 && <button
                        type="button"
                        onClick={() => onRestart(lvl + 1)}
                        className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add one level - {lvl + 1}
                    </button>}
                </div>
            </div>
        </div>
    </div>
}

export default PopUp