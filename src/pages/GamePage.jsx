import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard.jsx';
import Button from '../components/Button.jsx';
import UseSocket from '../hooks/useSocket.jsx';
import { Chess } from "chess.js";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MessagesBox from '../components/MessagesBox.jsx';
import Iwin from '../components/Iwin.jsx';
import OpponentWin from '../components/OpponentWin.jsx';
import Alert from '@mui/material/Alert';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'GAME_OVER';
export const MESSAGE = 'message';

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
    const [showCharacters , setShowCharacters] = useState(false);
    const [messages, setNewMessage] = useState([]);
    const [GameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [showWin  , setShowWin] = useState(false);
    const [showLose , setShowLose] = useState(false);

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
                case MESSAGE : 
                    setNewMessage(prev => [...prev , {message : message.message , owner : message.owner}]);
                    break;
                case GAME_OVER : 
                    setGameOver(true);
                    setWinner(message.payload.winner === 'white' ? 'black' : 'white');
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

    useEffect( () => {
        console.log(color , winner , GameOver);
        if(winner){
            if( color !== winner){
                setShowWin(true);
            } else {
                setShowLose(true);
            }
        }

    },[winner, GameOver]);

    if(!socket) return (
        <>
            <div className='text-white flex justify-center pt-10 text-3xl'>
                Connecting<img className='h-10 pt-5' src="/SearchingAnimation3.svg"/>
            </div>
            <div className='text-white flex justify-center pt-10 text-xl'>
                Wait for 50 sec
            </div>
        </>
    );

    const handleShowCharacter = () => {
        setShowCharacters( (prev) => !prev);
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        socket.send(JSON.stringify({
            type : MESSAGE,
            message : e.target.new_message.value,
        }));
        e.target.new_message.value = "";
    }
 
    return (
        <div className='flex justify-center'>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${showWin ? 'scale-100' : 'scale-0'}`}>
                    {showWin && <Iwin />}
                </div>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${showLose ? 'scale-100' : 'scale-0'}`}>
                    {showLose && <OpponentWin setShowLose={setShowLose}/> }
                </div>

            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    
                    <div className='col-span-4 flex flex-col justify-center'>
                        <div className='text-white pl-2.5 inline-flex'>
                            <FormControlLabel
                                control=
                                {
                                    <Switch 
                                    checked={showCharacters}
                                    onChange={handleShowCharacter}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                            {chess.inCheck() && 
                                <span className="text-gray-400 animate-pulse duration-5 text-xl flex items-center">
                                    CHECKMATE
                                    <Alert severity='warning' sx={{bgcolor:"transparent", marginLeft:"-0.8rem"}}/>
                                </span>
                            }   
                        </div>
                        <ChessBoard started={started} chess={chess} setBoard={setBoard} socket={socket} board={board} disabled={opponentsTurn} showCharacters={showCharacters} />
                    </div>
                    <div className='col-span-2 bg-slate-900 w-full flex justify-center'>
                        <div className='pt-8 flex flex-col items-center space-y-2 relative'>
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
                            {/* {message box } */}
                             
                            {started && <MessagesBox messages={messages} handleMessageSubmit={handleMessageSubmit}/> }

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
                                    <img
                                        src="/SearchingAnimation3.svg"
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
