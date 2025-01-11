import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import React, { useRef } from 'react'

function Button({onClick, children, disabled=false, h="full" , w="full"}) {
    const another_button_abs = useRef();
    const motion_button_child = useRef();

    const handleMouseEnter = () => {
        if(!another_button_abs.current) return ;
        const gtl = gsap.timeline();

        gtl.to(another_button_abs.current, {
            top : "0rem",
            duration : 0.25,
            ease : "power3.in"
        }, "another_button_abs")
        .to(motion_button_child.current, {
            y : -10,
            delay : 0.1,
            duration : 0.5,
        }, "another_button_abs")
        ;
    }
    const handleMouseLeave = () => {
        const gtl = gsap.timeline();
        gtl.to(another_button_abs.current, {
            top : "3rem",
            duration : 0.25,
            ease : "power3.in"
        }, "another_button_abs2")
        .to(motion_button_child.current, {
            y : 0,
            duration : 0.5,
        }, "another_button_abs2")
        ;
        gsap;
    }

    return (
        <div className='relative overflow-hidden'>
            <motion.button 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                whileTap={{scale : 0.7}}
                onClick={onClick}
                className={`h-${h} w-${w} pr-4 pl-4 justify-center items-center text-2xl  bg-green-500 duration-300 text-white font-bold rounded-md `}
                disabled={disabled}
            >
                <div ref={motion_button_child}>
                    {children}
                </div>
            </motion.button>
            <motion.button 
                whileTap={{scale : 0.7}}
                onClick={onClick}
                ref={another_button_abs}
                className={`absolute shadow-inner shadow-gray-500 pointer-events-none left-0 top-[3rem] h-${h} w-${w} pr-4 pl-4 justify-center items-center text-2xl  bg-green-50 text-green-500 font-bold rounded-md `}
                disabled={disabled}
            >
                {children}
            </motion.button>
        </div>  
    )
}

export default Button
