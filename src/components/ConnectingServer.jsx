import React, { useEffect, useState } from 'react'
import ChessBoardModel from './ChessBoardModel';
import LandingPageFeatures from './LandingPageFeatures';
import MotionCardUseCase_1 from './MotionCardUseCase_1';

function ConnectingServer() {
    const [waitingTime ,setWaitingTime] = useState(49);

    useEffect(() => {
        const interval = setInterval(() => {
            setWaitingTime(prev => (prev <= 0 ? 39 : prev - 1));
        }, 1100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='text-white flex justify-center pt-10 text-3xl'>
                Connecting<img className='h-10 pt-5' src="/SearchingAnimation3.svg"/>
            </div>
            <div className='text-white flex justify-center pt-10 text-xl'>
                Please wait for {waitingTime} sec.
            </div>
            <div className='flex justify-center items-center'>
                <ChessBoardModel/>
            </div>
            <div className='flex mb-10 justify-center items-center'>
                <LandingPageFeatures/>
            </div>
            <div className='flex mb-10 ml-4 mr-4 justify-center items-center'>
                <MotionCardUseCase_1/>
            </div>
        </>
    )
}

export default ConnectingServer
