import React from 'react'
import MessagesBox from './MessagesBox';
import Button from './Button';
import { INIT_GAME } from './Messages';
function GameDetails({currUser , color , moveCount , opponentsTurn, messages, specting , 
                        handleMessageSubmit , started , findingPlayer , socket , channelNumber,gamesCount , 
                        setStreamPage ,setFindingPlayer ,handleChannelNumber
                    }) 
    {
    return (
        <div className=' col-span-2 bg-slate-900 w-full max-sm:w-222 max-sm:h-96 max-sm:mb-4 flex justify-center rounded-md overflow-hidden'>
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
            
            {/* {message box } */}
             
            {started && <MessagesBox messages={messages} specting={specting} handleMessageSubmit={handleMessageSubmit}/> }
            {/* {channel input } */}
            {!started &&
                <div className='flex flex-start flex-col'>
                    <span className='text-md text-gray-500'>Private Channel</span>
                    <input
                    type="Number"
                    id="channelNumber"
                    name="channelNumber"
                    className="bg-gray-50 border h-10 w-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"1 to 9999"}
                    min={1}
                    max={9999}
                    value={channelNumber}
                    onChange={handleChannelNumber}
                    /> 
                </div>
            }
            {/* Button to start the game */}
            {!started && !findingPlayer && (
                <div className='flex flex-row space-x-2'>
                    <Button
                        onClick={() => {
                            socket.send(JSON.stringify({ type: INIT_GAME , channel : channelNumber }));
                            setFindingPlayer(true);
                        }}
                        h={"12"}
                        w={"52"}
                        disabled={findingPlayer}
                    >
                        Play
                    </Button>
                {/* {stream button } */}
                {gamesCount > 0 && 
                    <Button
                        onClick={() => {
                            setStreamPage(true);
                        }}
                        h={"12"}
                        w={"36"}
                    >
                        Streams
                    </Button>
                }
                </div>
                )
            }
            
            {/* Finding player message */}
            {findingPlayer && (
                <span className='text-white text-lg font-mono '>
                    <img
                        src="/SearchingAnimation3.svg"
                    />
                    do min...
                </span>
            )}
        </div>
    </div> 
    )
}

export default GameDetails
