import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard.jsx';
import Button from '../components/Button.jsx';
import UseSocket from '../hooks/useSocket.jsx';
import { Chess } from "chess.js";
import CircularProgress from '@mui/material/CircularProgress';
import animation from "../../public/SearchingAnimation.json";
import Lottie from 'lottie-react-web';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'GAME_OVER';

function GamePage() {
    const socket = UseSocket();
    const [chess, setChess] = useState(new Chess());
    const [board , setBoard] = useState(chess.board());
    const [started , setStarted] = useState(false);
    const [color , setColor] = useState(null);
    const [turn, setTurn] = useState('black');
    const [findingPlayer ,setFindingPlayer] = useState(false);
    const [opponentsTurn , setOpponentsTurn] = useState(false);
    const [moveCount , setMoveCount] = useState(null);

    const [currUser , setCurrUser ] = useState(() => {
        const curr = localStorage.getItem("currUser");
        return curr ? JSON.parse(curr) : null;
    });

    useEffect (() => {
        if(!socket){
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch(message.type){
                case INIT_GAME :
                    setBoard(chess.board());
                    setStarted(true);
                    setFindingPlayer(false);
                    setColor(message.payload.color);
                    console.log("game initialized ");
                    break;
                case MOVE : 
                    const move = message.payload;
                    setMoveCount(message.moveCount);
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move made ");
                    break;
                case GAME_OVER : 
                    console.log("game over");
                    break;
            }
        }
    },[socket]);

    useEffect ( () => {
        setTurn(chess.turn());
        if (color) {
            if ((turn === 'w' && color === 'black') || (turn === 'b' && color === 'white')) {
                setOpponentsTurn(true);
            } else {
                setOpponentsTurn(false);
            }
        }
    } , [socket, chess, board, turn, color]);

    if(!socket) return (
        <div className='text-white flex justify-center pt-10 text-3xl'>
            Connecting...
        </div>
    );

    return (
        <div className='flex justify-center'>
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className='col-span-4 flex justify-center'>
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} disabled={opponentsTurn} />
                    </div>
                    <div className='col-span-2 bg-slate-900 w-full flex justify-center'>
                        <div className='pt-8 flex flex-col items-center space-y-2'>
                            {/* Greeting the user */}
                            <span className='text-white text-2xl font-bold'>
                                <span>Hello, { currUser ? currUser : "Guest"}</span>
                            </span>
                            {/* Displaying player's color */}
                            <span className='text-white text-lg'>
                                {color && <span>You are {color === 'white' ? 'Black' : 'White'}</span>}
                            </span>
                            {/* Displaying move's count */}
                            <span className='text-white text-lg'>
                                {moveCount && <span>Move Count : <b>{moveCount}</b></span>}
                            </span>
                            
                            {/* Displaying turn information */}
                            <span className='text-white text-lg'>
                                {color && (
                                    <span>
                                        {opponentsTurn ? "It's your opponent's turn" : "It's your turn"}
                                    </span>
                                )}
                            </span>
                            {/* Button to start the game */}
                            {!started && !findingPlayer && (
                                <Button
                                    onClick={() => {
                                        socket.send(JSON.stringify({ type: INIT_GAME }));
                                        setFindingPlayer(true);
                                    }}
                                    disabled={findingPlayer}
                                    className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 disabled:bg-gray-600'
                                >
                                    Play
                                </Button>
                            )}
                            {/* Finding player message */}
                            {findingPlayer && (
                                <span className='text-white text-lg font-mono '>
                                    <Lottie
                                        options={{ animationData : animation }}
                                        width={100}
                                        height={100}
                                    />
                                    do min...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
}

export default GamePage;
