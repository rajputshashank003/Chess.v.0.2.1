import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChessTitle() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/")} className='flex cursor-pointer justify-center items-center text-green-600 font-black text-3xl'>
            ChessV
        </div>
    )
}

export default ChessTitle
