import React, { useEffect, useState } from 'react'
import Model1 from './Model1';
import LandingPageFeatures from './LandingPageFeatures';

function ConnectingServer() {
    const [waitingTime ,setWaitingTime] = useState(49);

    useEffect(() => {
        const interval = setInterval(() => {
            setWaitingTime(prev => (prev <= 0 ? 49 : prev - 1));
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
                <Model1/>
            </div>
            <div className='flex mb-10 justify-center items-center'>
                <LandingPageFeatures/>
            </div>
        </>
    )
}

export default ConnectingServer
