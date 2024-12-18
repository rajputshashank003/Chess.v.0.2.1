import React, { useEffect, useState } from 'react'
import MessagesBox from './MessagesBox';
import Button from './Button';
import { INIT_GAME, MESSAGEALL } from './Messages';
import MicrophoneButton from "./MicrophoneButton.jsx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import VideoCallButton from './VideoCallButton.jsx';
import EndCall from './EndCall.jsx';

function GameDetails({currUser , color , moveCount , opponentsTurn, messages, specting , 
                        handleMessageSubmit , started , findingPlayer , socket , channelNumber,gamesCount , 
                        setStreamPage ,setFindingPlayer ,handleChannelNumber, audioElement , callStarted ,
                        handleStartCall, endCall, wantsVideoAudio, setWantsVideoAudio
                    }) 
    {
    
    const handleMessageSubmitToAll = (e) => {
        e.preventDefault();
        socket.send(JSON.stringify({
            type : MESSAGEALL ,
            message : e.target.new_message.value,
        }));
        e.target.new_message.value = "";
    }
    const [callMinutes , setCallMinutes] = useState(0);
    const [callSeconds , setCallSeconds] = useState(0);
    const [startCallSent , setStartCallSent] = useState(false);

    useEffect(() => {
        let interval;
        if (callStarted) {
            interval = setInterval(() => {
                setCallSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setCallMinutes((prevMinutes) => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
            setCallMinutes(0);
            setCallSeconds(0);
        }
        if(callStarted){
            setStartCallSent(false)
        }
        return () => clearInterval(interval);
    }, [callStarted]);
    
    const handleMicrophone = () => {
        if(callStarted){
            endCall();
        } else {
            setStartCallSent(true);
            handleStartCall();
        }
    }
    const handleVideoAudio = async () => {
        if(callStarted){
            endCall();
        } else {
            setStartCallSent(true);
            setWantsVideoAudio((prev) => !prev);
            await handleStartCall();
        }
    }
    const handlePlayButton = () => {
        socket.send(JSON.stringify({ 
            type: INIT_GAME , 
            channel : channelNumber
        }));
        setFindingPlayer(true);
    }
    
    return (
        <div className='col-span-2 bg-slate-900 w-full max-sm:w-222 flex justify-center rounded-md overflow-hidden'>
        <div className='pt-8 flex flex-col items-center space-y-2 relative'>
            {/* Greeting the user */}
            <span className='text-white text-2xl font-bold '>
                <span>Hello, { currUser ? currUser : "Guest"}</span>
            </span>
            {specting && 
                <span className='text-gray-600 text-2xl font-bold '>
                    Live Streaming
                </span>
            }
            {/* Displaying move's count */}
            <span className='text-white text-lg'>
                {moveCount > 0 && <span>Move Count : <b>{moveCount+1}</b></span>}
            </span>
            
            {/* Displaying turn information */}
            <span className='text-white text-lg'>
                {color && (
                    <span>
                        {opponentsTurn ? "It's your opponent's turn" : "It's your turn"}
                    </span>
                )}
            </span>
            
            {/* {channel input } */}
            {!started &&
                <div className='flex flex-start flex-col'>
                    <span className='text-md text-gray-500'>Private Channel</span>
                    <input
                    type="Number"
                    id="channelNumber"
                    name="channelNumber"
                    className="bg-gray-50 border h-10 w-32 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"1 to 9999"}
                    min={1}
                    max={9999}
                    value={channelNumber}
                    onChange={handleChannelNumber}
                    /> 
                </div>
            }
            {/* Button to start the game */}
            {
                !started && !findingPlayer && 
                (
                    <div className='flex flex-row space-x-2'>
                        <Button
                            onClick={handlePlayButton}
                            h={"12"}
                            w={"32"}
                            disabled={findingPlayer}
                        >
                            Play
                        </Button>
                        {/* {stream button } */}
                        {
                            gamesCount > 0 && 
                            <Button
                                onClick={() => {
                                    setStreamPage(true);
                                }}
                                h={"12"}
                                w={"32"}
                            >
                                Streams
                            </Button>
                        }
                    </div>
                )
            }
            {/* Finding player message */}
            {findingPlayer && 
                <div className="text-white h-fit text-lg font-mono flex flex-col items-center justify-center">
                    <img
                        src="/FindingPlayer.svg"
                    />
                    do min...
                </div>
            }
            {/* show game started tab */}
            {
                started && !specting &&
                <div className="flex justify-center items-center gap-4">
                    {
                        callStarted && 
                        <span className="text-xl text-gray-200 px-1 pr-0 py-2 rounded">
                            {callMinutes} : {callSeconds}
                        </span>
                    }
                    {   
                        !callStarted && !startCallSent &&
                        <span onClick={() => handleMicrophone()} className="p-2 px-0 rounded">
                            <MicrophoneButton muted={!callStarted} />
                        </span>
                    }
                    {   
                        !callStarted && !startCallSent &&
                        <span onClick={() => handleVideoAudio()} className="p-2 px-0 rounded">
                            <VideoCallButton wantsVideoAudio={wantsVideoAudio} />
                        </span>
                    }
                    {
                        startCallSent && !callStarted &&           
                        <div className='m-0 p-0 h-28'>              
                            <DotLottieReact
                                src="/CallingAnimation.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    }
                    {
                        callStarted && 
                        <span onClick={() => handleMicrophone()} className="p-2 px-0 rounded">
                            <EndCall />
                        </span>
                    }
                </div>
            }
            {/* {message box } */}
            <div className='absolute bottom-0 max-sm:relative'>   
                <MessagesBox messages={messages} specting={specting} started={started} handleMessageSubmitToAll={handleMessageSubmitToAll} handleMessageSubmit={handleMessageSubmit} /> 
            </div>
            <audio className='bg-gray-700 hidden' ref={audioElement} controls={true} autoPlay={true}></audio>
        </div>
    </div> 
    )
}

export default GameDetails
