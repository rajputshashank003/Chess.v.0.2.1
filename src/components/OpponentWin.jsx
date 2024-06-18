import React from 'react'
import {useNavigate} from "react-router-dom";

function OpponentWin({setShowLose}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div className='inset-0 h-full flex items-center justify-center text-8xl bg-opacity-75 bg-black z-60'>
            <div className='text-red-500 text-center flex flex-col' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                <i>Better Luck Next Time!</i>
                <span 
                className='text-white text-4xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400'
                onClick= {handleNavigate}
                >
                    Restart
                </span>
            </div>
        </div>
    )
}

export default OpponentWin
