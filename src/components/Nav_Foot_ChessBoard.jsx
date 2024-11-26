import { Alert } from '@mui/material'
import React from 'react'
import CoordinateSwitch from '../components/CoordinateSwitch.jsx';
import ChessBoard from '../components/ChessBoard.jsx';

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
    turn
}) {
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
            <div className={`text-white pl-1 h-10 inline-flex justify-center items-center bg-slate-900 mt-1 max-sm:w-222 w-111 rounded-sm `}>
                {viewCount > 0 && 
                    <span className='text-gray-400 mr-2 text-lg'>
                        <span className='text-gray-200 text-xl'>{viewCount}</span>&nbsp; viewer
                    </span>
                }
            </div>
        </div>
    )
}

export default Nav_Foot_ChessBoard
