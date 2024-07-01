import React from 'react';
import { useNavigate } from 'react-router-dom';

function StreamOverPage({ winner}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div className='inset-0 flex items-center justify-center h-full text-8xl bg-opacity-75 backdrop-blur-md z-60'>
            <div className='text-red-700 text-center justify-cener items-center font-black h-full flex flex-col' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {winner && winner.toUpperCase()} {winner !== 'white' && winner !== 'black' ? "" : 'wins'}
            </div>
            <div 
                className='fixed top-10 right-10 text-white font-black text-4xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-400'
                onClick={handleNavigate}
            >
                X
            </div>
        </div>
    )
}

export default StreamOverPage;
