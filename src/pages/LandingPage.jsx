import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import UserName from '../components/UserName.jsx';
import ChessTitle from '../components/ChessTitle.jsx';
import Model1 from '../components/Model1.jsx';
import LocomotiveScroll from 'locomotive-scroll';
import LandingPageFeatures from '../components/LandingPageFeatures.jsx';

function LandingPage() {
    const navigate = useNavigate();
    const locomotiveScroll = new LocomotiveScroll();
    
    return (
        <>
        <div className='flex justify-center items-center relative'>
            <div className="p-2 m-8 max-w-screen-md">
                <div className='relative flex m-4 justify-center items-center'>
                    <ChessTitle/>
                </div>
                <div className="grid pt-4 grid-cols-1 gap-4 md:grid-cols-2">
                    <div className='flex justify-center'>
                        {/* <img src="/chessboard.jpeg" 
                        className='max-w-100' /> */}
                        <div className='max-w-100 h-fit'>
                            <Model1/>
                        </div>
                    </div>
                    <div className=' pt-16 z-[9999]'>
                        <div className="flex justify-center">
                            <h1 className="font-bold text-4xl text-white"> 
                                Play Chess Online
                            </h1>
                        </div>
                        <div className='mt-8 flex flex-col items-center space-y-4'>
                            <UserName />
                            <Button 
                                onClick={() => navigate("/game")}
                                h='12'
                                w='56'
                            >
                                Play Online
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex mb-10 justify-center items-center'>
            <LandingPageFeatures/>
        </div>
        </>
    )
}

export default LandingPage
