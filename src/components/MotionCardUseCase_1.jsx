import React from 'react'
import { MotionCard } from './MotionCard'
import { useNavigate } from 'react-router-dom'
import ModelQueen from './ModelQueen';

function MotionCardUseCase_1() {
    const navigate = useNavigate();
    return (
        <MotionCard containerClassName="cursor-pointer">
            <div className="grid grid-cols-4 max-sm:flex max-sm:flex-col items-center justify-center relative">
                <div className='col-span-1'>
                    <ModelQueen/>
                </div>
                <div className="col-span-3 pb-4 max-md:text-xl font-black bg-gradient-to-b from-slate-400 to-slate-100 text-transparent bg-clip-text tracking-tighter">
                    <span className='md:text-3xl'>Play on </span> 
                    <span
                        className='cursor-pointer text-6xl max-md:text-4xl' 
                        onClick={() => navigate("/")}
                    > 
                        ChessV
                    </span>
                    <span className='md:text-3xl'> to Compete, <br />Order on </span>
                    <span className='cursor-pointer'> 
                        <a
                        className='text-6xl max-md:text-4xl' 
                        href='https://foodybro.vercel.app'
                        > 
                            FoodyBro
                        </a>
                    </span>
                    <span className='md:text-3xl'> to Grab the Treat </span>
                </div>
            </div>
        </MotionCard>
    )
}

export default MotionCardUseCase_1
