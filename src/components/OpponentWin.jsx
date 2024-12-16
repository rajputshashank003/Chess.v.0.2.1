import React from 'react'
import {useNavigate} from "react-router-dom";

function OpponentWin({setShowLose}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div className='inset-0 h-full flex items-center justify-center text-8xl bg-opacity-75 backdrop-blur-md z-60'>
            <div className='text-red-500 text-center flex flex-col' >
                <div className='p-8 rounded-md text-center'>
                    <img src="./Loose.png" className='mx-auto w-full h-3/4 pt-10' alt="Winner" />
                </div>
                <span 
                className='fixed top-10 right-10 text-black font-black text-4xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400'
                onClick= {handleNavigate}
                >
                    X
                </span>
            </div>
        </div>
    )
}

export default OpponentWin
