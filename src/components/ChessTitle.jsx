import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

function ChessTitle() {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/")} className='flex h-16 max-sm:h-12 duration-200 cursor-pointer hover:scale-150 overflow-hidden absolute justify-center items-center text-green-600 font-black max-sm:text-4xl text-5xl'>
            {'ChessV'.split("").map((item, index) => (
                <motion.span
                    key={index} 
                    className='inline'
                    initial={{ y : "100%" }}
                    animate={{ y : "0%" }}
                    transition={{ delay: index * 0.2 }}
                >
                    {item}
                </motion.span>
            ))}
        </div>
    )
}

export default ChessTitle;
