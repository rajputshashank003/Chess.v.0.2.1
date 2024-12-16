import React from 'react'

function Gamestarted() {
    return (
        <div className='inset-0 h-full flex items-center justify-center text-8xl bg-opacity-75 backdrop-blur-md z-60'>
            <div className='text-red-500 text-center flex flex-col' >
                <div className='p-8 rounded-md text-center'>
                    <img src="./Gamestarted.png" className='mx-auto w-full h-96 pt-10' alt="gamestarted" />
                </div>
            </div>
        </div>
    )
}

export default Gamestarted
