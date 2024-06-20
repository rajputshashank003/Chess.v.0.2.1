import React from 'react'

function Button({onClick, children, disabled=false, h="fit" , w="fit"}) {
    return (
        <button 
            onClick={onClick}
            className={`h-${h} w-${w} justify-center items-center text-2xl  bg-green-500 hover:bg-green-800 duration-300 text-white font-bold rounded `}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
