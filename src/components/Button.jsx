import React from 'react'

function Button({onClick, children, disabled=false}) {
    return (
        <button 
            onClick={onClick}
            className={` ${disabled ? "text-sm px-4 py-1 bg-slate-300" : "text-2xl px-8 py-4 bg-green-500 thover:bg-green-700" } text-white font-bold rounded `}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
