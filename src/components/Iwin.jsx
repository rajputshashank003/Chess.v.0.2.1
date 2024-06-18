import React from 'react';
import { useNavigate } from 'react-router-dom';

function Iwin() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    return (
        <div className='inset-0 flex items-center justify-center text-8xl bg-opacity-75 bg-black z-60'>
            <div className='p-8 rounded-lg text-center'>
                <img src="./winner3.png" className='mx-auto w-full h-96 pt-10 animate-bounce' alt="Winner" />
                <img src="./winner4.png" className='mx-auto h-72' alt="Winner" />
            </div>
            <div 
                className='fixed top-10 right-10 text-white text-4xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400'
                onClick={handleNavigate}
            >
                X
            </div>
        </div>
    )
}

export default Iwin;
