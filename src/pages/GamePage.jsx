import React, { useEffect, useState } from 'react'
import ChessBoard from '../components/ChessBoard.jsx'
import Button from '../components/Button.jsx'
import UseSocket from '../hooks/useSocket.jsx';
import {Chess } from "chess.js";
import CircularProgress from '@mui/material/CircularProgress';

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
    } , [socket, chess, board]);

    if(!socket) return ( <div className='text-white flex justify-center pt-10 text-3xl'>
                            Connecting...
                        </div>
                );
    return (
        <div className='flex justify-center '>
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className='col-span-4 flex justify-center'>
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board}/>
                    </div>
                    <div className='col-span-2 bg-slate-900 w-full flex justify-center'>
                        <div className='pt-8'>
                            <span className='text-white'>
                                { color && <span>You are </span>}{color == 'white' && "Black"} {color == 'black' && "White"}
                            </span>
                            <br />
                            <span className='text-white'>
                                { color && <span>{turn === 'w' && color == 'white' && "It's yours turn" } 
                                    {turn === 'b' && color == 'black' && "It's yours turn" } </span>
                                }
                            </span>
                            {!started && <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME,
                                }))
                                setFindingPlayer(true);
                            }} disabled={findingPlayer}
                            >
                               {!findingPlayer ? "Play" : <CircularProgress />}
                            </Button>
                            }
                            {
                                findingPlayer && <span className='text-white flex justify-center '><br />Finding Player</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default GamePage
