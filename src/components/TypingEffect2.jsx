import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

function TypingEffect2({text, audioEffectsCanPlay}) {
    const audioRef = useRef(null);
    useEffect(() => {
        if(audioRef && audioEffectsCanPlay ){
            audioRef.current.play();
        }
        const timeout = setTimeout(() => {
            if(audioRef ){
                audioRef.current.pause();
            }
        }, text.length * 50);
        return () => clearTimeout(timeout);
    },[text]);
    return (
        <motion.div key={text} className='text-lg text-white'>
            {
                text.split("").map((c, ind) => (
                    <motion.span 
                        key={ind}
                        initial={{
                            opacity : 0,
                            filter : "blur(10px)"
                        }}
                        animate={{
                            opacity : 1,
                            filter : "blur(0px)"
                        }}
                        transition={{
                            delay : ind * 0.05,
                            duration : 0.2
                        }}
                    >
                        {c}
                    </motion.span>
                ))
            }
            <audio ref={audioRef} src="/TypingEffectAudio.mp3" loop></audio>
        </motion.div>

    )
}

export default TypingEffect2
