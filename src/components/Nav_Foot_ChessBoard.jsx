import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoordinateSwitch from '../components/CoordinateSwitch.jsx';
import ChessBoard from '../components/ChessBoard.jsx';
import { ASK_FOR_HELP, GAMEPLAY_TIPS, HELP_RECEIVED } from './Messages.js';
import { toast } from 'react-toastify';
import TypingEffect from './TypingEffect.jsx';

function Nav_Foot_ChessBoard({
    chess,
    color,
    started,
    setBoard,
    socket,
    board,
    showCharacters , 
    handleShowCharacter , 
    channelNumber ,
    specting, 
    viewCount,
    opponentsTurn,
    turn,
    tipText,
    setTipText,
    showTip,
    setShowTip,
    audioEffectsCanPlay,
}) {

    const askHelp = async () => {
        if(!started){
            socket.send(JSON.stringify({
                type : GAMEPLAY_TIPS,
            }));
            return;
        }
        if(opponentsTurn){
            toast.error("Its opponents turn!");
            return;
        }
        socket.send(JSON.stringify({
            type : ASK_FOR_HELP,
            board : chess.board(),
            color : color ,
            fen : chess.fen()
        }))
    }

    useEffect(() => {
        setShowTip(true);
        const timeout = setTimeout(() => {
            setShowTip(false);
        }, 15000);
        return () => clearTimeout(timeout);
    },[tipText]);

    useEffect(() => {
        askHelp();
    },[]);

    return (
        <div className='col-span-4 flex flex-col justify-center items-center '>
            <div className={`text-white pl-1 inline-flex flex-start items-center h-10 bg-slate-900 mb-1 max-sm:w-222 w-111 rounded-sm `}>
                <CoordinateSwitch showCharacters={showCharacters} handleShowCharacter={handleShowCharacter}/> 
                {channelNumber > 0 && 
                    <span className="text-gray-400 duration-5 text-2xl items-center pr-2">
                        <span className='text-gray-500 text-xl'>Id &nbsp;</span>{channelNumber}
                    </span>
                }
                {chess.inCheck() && 
                    <span className="animate-pulse duration-5 text-xl flex items-center">
                        <Alert severity='warning' sx={{bgcolor:"transparent", marginLeft:"-0.8rem"}}/>
                    </span>
                }

            </div>
            <ChessBoard 
                color={color} 
                started={started} 
                chess={chess} 
                setBoard={setBoard} 
                socket={socket} 
                board={board} 
                disabled={opponentsTurn} 
                showCharacters={showCharacters} 
                specting={specting}
                turn={turn}
            />
            {   ( viewCount > 0 || !opponentsTurn ) &&
                <div className={`text-white pl-1 h-10 flex justify-center items-center bg-slate-900 mt-1 max-sm:w-222 w-111 rounded-sm `}>
                    {viewCount > 0 && 
                        <div className='text-gray-400 m-4 text-lg'>
                            <span className='text-gray-200 text-xl'>{viewCount}</span>&nbsp; viewer
                        </div>
                    }
                    {
                        !opponentsTurn &&
                        <div onClick={askHelp} className="relative group cursor-pointer">
                            {/* <img 
                                src="/GeminiAi.png" 
                                className="h-8 group-hover:scale-125 duration-200 cursor-pointer" 
                                onClick={askHelp} 
                                alt="Gemini AI"
                            /> */}
                            {/* AI ANIMATION
                                https://lottie.host/2b44cc65-d33b-4546-8fc0-9b6571757120/Kw9VkoSrIE.lottie
                                src="https://lottie.host/9b15a8e6-c3bc-47da-b209-4fd83449b1f6/g4YaA4zMoH.lottie"
                            */}
                            <div className='h-10 '>
                                <dotlottie-player 
                                    src="https://lottie.host/d9b1124c-83eb-453b-9c7c-222f2ab91ba8/F5Mr10chps.lottie" 
                                    background="transparent" 
                                    speed="1" 
                                    loop 
                                    autoplay
                                >
                                </dotlottie-player>       
                            </div>       
                            <div className="absolute w-32 flex justify-center align-center bottom-0 top-8 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 bg-transparent text-white text-sm rounded py-1 px-2">
                                AI Suggestion
                            </div>
                        </div>  
                    }
                </div>
            }
            {
                tipText.length > 0 && showTip && 
                <div className={`overflow-scroll no-scrollbar text-white pl-1 min-h-10 h-fit flex justify-center items-center bg-slate-900 mt-1 max-sm:w-222 w-111 rounded-sm `}>
                    <div className='text-white'>
                        <TypingEffect audioEffectsCanPlay={audioEffectsCanPlay}  tipText={tipText}/>
                    </div>    
                </div>
            }
        </div>
    )
}

export default Nav_Foot_ChessBoard
