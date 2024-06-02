import React from 'react'

function Button({onClick, children}) {
    return (
        <button 
            onClick={onClick}
            className='px-8 py-4 text-2xl bg-green-500 text-white font-bold rounded hover:bg-green-700'
        >
            {children}
        </button>
    )
}

export default Button
