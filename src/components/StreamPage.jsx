import React, { useState } from 'react'
import { INIT_SPECTING } from './Messages';

function StreamPage({setStreamPage, gamesCount, socket, setSpecting , setChannelNumber , channelNumber}) {

    const handleStreamGame = (index) => {
        socket.send(JSON.stringify({ type: INIT_SPECTING , index }));
        setStreamPage(false);
        setSpecting(true);
    }

    const handleChannelNumber = (e) => {
        e.preventDefault();
        setChannelNumber(e.target.value);
    }
    
    const handleFindGame = (e) => {
        e.preventDefault();
        socket.send(JSON.stringify({ type: INIT_SPECTING , channelNumber : channelNumber}));
        setStreamPage(false);
        setSpecting(true);
    }

    return (
        <div className='inset-0 flex h-full text-lg items-center justify-center bg-opacity-85 backdrop-blur-md z-60'>
            <span className='text-5xl text-white absolute top-10 '>Game Rooms</span>
            <div className='absolute top-24 flex space-x-4'>
                <input
                    type="Number"
                    id="channelNumber"
                    name="channelNumber"
                    className="bg-gray-50 border h-12 w-22 pr-5 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"1 to 9999"}
                    min={1}
                    max={9999}
                    value={channelNumber}
                    onChange={handleChannelNumber}
                />
                <button
                    onClick={handleFindGame}
                    className='h-12 w-56 py-2 text-white rounded-md bg-green-600 hover:bg-green-800 duration-100'
                >
                    Find Game
                </button>
            </div>
            <div className='text-white h-4/5 w-4/5 flex flex-wrap justify-center p-20 overflow-scroll no-scrollbar'>
                {gamesCount > 0 ? (
                    Array.from({ length: gamesCount }, (_, index) => (
                        <div 
                            key={index} 
                            className='p-4 m-4 w-24 h-14 bg-gray-700 rounded-md cursor-pointer duration-500 hover:bg-gray-900 shadow-2xl flex items-center justify-center text-center'
                            onClick={() => handleStreamGame(index)}
                        >
                            Game {index + 1}
                        </div>
                    ))
                ) : (
                    <div className='text-3xl items-center flex '>No games to display</div>
                )}
            </div>
            <div 
                className='max-sm:top-2 max-sm:text-2xl fixed top-10 right-10 text-white text-4xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400'
                onClick={() => setStreamPage(false)}
            >
                X
            </div>
        </div>
    )
}

export default StreamPage
