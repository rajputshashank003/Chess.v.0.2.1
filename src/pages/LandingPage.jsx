import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

function LandingPage() {
    const navigate = useNavigate();


    return (
        <div className='flex justify-center'>
            <div className="pt-2 max-w-screen-md">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className='flex justify-center'>
                        <img src="/chessboard.jpeg" 
                        className='max-w-96' />
                    </div>
                    <div className='pt-16'>
                        <div className="flex justify-center">
                            <h1 className="font-bold text-4xl text-white"> 
                                Play Chess Online on #3 Site!
                            </h1>
                        </div>
                        <div className='mt-8 flex justify-center'>
                            <Button onClick={() => {navigate("/game")}}>
                                Play Online
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
