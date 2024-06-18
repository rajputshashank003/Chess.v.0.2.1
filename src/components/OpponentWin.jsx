import React from 'react'

function OpponentWin() {
    return (
        <div className='inset-0 h-full flex items-center justify-center text-8xl bg-opacity-75 bg-black z-60'>
            <div className='text-red-500 text-center' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                <i>Better Luck Next Time!</i>
            </div>
        </div>
    )
}

export default OpponentWin
