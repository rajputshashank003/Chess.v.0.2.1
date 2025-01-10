import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import UserName from '../components/UserName.jsx';
import ChessTitle from '../components/ChessTitle.jsx';
import ChessBoardModel from '../components/ChessBoardModel.jsx';
import LocomotiveScroll from 'locomotive-scroll';
import MotionCardUseCase_1 from '../components/MotionCardUseCase_1.jsx';
import SkyDive from '../components/SkyDive/index.jsx';
import UseSocket from '../hooks/useSocket.jsx';
import LandingPageProgress from '../components/LandingPageProgress.jsx';

function LandingPage() {
    const socket = UseSocket();
    const navigate = useNavigate();

    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll();
    },[]);

    return (
        <>
        <LandingPageProgress/>
        <div className='flex justify-center items-center relative'>
            <div className="p-2 m-8 max-w-screen-md">
                <div className='relative chess_title_9 flex m-4 justify-center items-center'>
                    <ChessTitle/>
                </div>
                <div className="grid pt-4 grid-cols-1 gap-4 md:grid-cols-2">
                    <div className='flex justify-center'>
                        {/* <img src="/chessboard.jpeg" 
                        className='max-w-100' /> */}
                        <div className='h-fit chess_board_model'>
                            <ChessBoardModel/>
                        </div>
                    </div>
                    <div className=' pt-16 z-[9999]'>
                        <div className="flex play_text_name justify-center">
                            <h1 className="font-bold text-4xl text-white"> 
                                Play Chess Online
                            </h1>
                        </div>
                        <div className='mt-8 flex play_button_online flex-col items-center space-y-4'>
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
        <div className=''>
            <SkyDive />
        </div>
        <div className="ml-4 mr-4">
            <MotionCardUseCase_1/>
        </div>
        </>
    )
}

export default LandingPage;