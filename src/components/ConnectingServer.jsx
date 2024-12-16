import React, { useEffect, useState } from 'react'
import Model1 from './Model1';

function ConnectingServer() {
    const [waitingTime ,setWaitingTime] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            setWaitingTime(prev => (prev <= 0 ? 59 : prev - 1));
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
        </>
    )
}

export default ConnectingServer
