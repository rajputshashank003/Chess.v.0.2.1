import { motion } from 'framer-motion'
import React from 'react'

function Button({onClick, children, disabled=false, h="full" , w="full"}) {
    return (
        <motion.button 
            whileTap={{scale : 0.7}}
            onClick={onClick}
            className={`h-${h} w-${w} pr-4 pl-4 justify-center items-center text-2xl  bg-green-500 hover:bg-green-800 duration-300 text-white font-bold rounded-md `}
            disabled={disabled}
        >
            {children}
        </motion.button>
    )
}

export default Button
