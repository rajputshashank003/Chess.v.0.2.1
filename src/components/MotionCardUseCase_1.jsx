import React from 'react'
import { MotionCard } from './MotionCard'
import { useNavigate } from 'react-router-dom'

function MotionCardUseCase_1() {
    const navigate = useNavigate();
    return (
        <MotionCard containerClassName="cursor-pointer">
            <div className="flex flex-col items-center justify-center relative">
                <div className="pb-4 text-xl max-md:text-md font-black bg-gradient-to-b from-slate-400 to-slate-100 text-transparent bg-clip-text tracking-tighter">
                    <span className=''>Play on </span> 
                    <span
                        className='cursor-pointer text-4xl' 
                        onClick={() => navigate("/")}
                    > 
                        ChessV
                    </span>
                    <span className=''> to Compete, <br />Order on </span>
                    <span className='cursor-pointer'> 
                        <a
                        className='text-4xl' 
                        href='https://foodybro.vercel.app'
                        > 
                            FoodyBro
                        </a>
                    </span>
                    <span className=''> to Grab the Treat </span>
                </div>
            </div>
        </MotionCard>
    )
}

export default MotionCardUseCase_1
