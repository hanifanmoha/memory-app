import React from 'react'

type RestartPopUpProps = {
    isOpen: boolean
    onClose: () => void
    onRestart: () => void
}

function RestartPopUp({ isOpen, onClose, onRestart }: RestartPopUpProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/95">
            <div className="w-full max-w-sm p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="text-center flex flex-col items-center">
                        <h3 className="text-gray-600 text-lg mb-6">Are you sure you want to restart the game?</h3>

                        <div className="w-full space-y-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-medium rounded-xl py-4 px-4 transition-colors text-lg"
                            >
                                No, Continue Playing
                            </button>

                            <button
                                type="button"
                                onClick={onRestart}
                                className="w-3/4 bg-[#d97706] hover:bg-[#b45309] text-white font-medium rounded-xl py-3 px-4 transition-colors"
                            >
                                Yes, Restart Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestartPopUp 