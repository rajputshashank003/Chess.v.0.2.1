import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendWinnerAmount } from '../services/cryptoService';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

function Iwin({betAmount}) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    }
    const wallet = useWallet();
    const [sent ,setSent] = useState(false);

    useEffect(() => {
        async function sendWinAmount(){
            if(sent) return ;
            const sol = betAmount * 2 * 0.90;
            const res = await sendWinnerAmount(sol, wallet);
            if(!res){
                toast.error("transaction error");
            } else {
                toast.success("win amount sent success")
            }
            setSent(true);
        }
        sendWinAmount();
    }, []);
    return (
        <div className='inset-0 flex items-center justify-center text-8xl bg-opacity-75 backdrop-blur-md z-60'>
            <div className='p-8 rounded-md text-center'>
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
