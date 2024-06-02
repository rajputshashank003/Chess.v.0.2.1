import React, { useEffect, useState } from 'react'
import ChessBoard from '../components/ChessBoard.jsx'
import Button from '../components/Button.jsx'
import UseSocket from '../hooks/useSocket.jsx';
import {Chess } from "chess.js";

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'GAME_OVER';

function GamePage() {
    const socket = UseSocket();
    const [chess, setChess] = useState(new Chess());
    const [board , setBoard] = useState(chess.board());
    const [started , setStarted] = useState(false);
    const [color , setColor] = useState(null);
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
                    setColor(message.payload.color);
                    console.log("game initialized ");
                    break;
                case MOVE : 
                    console.log("making move");
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
    },[socket])
    if(!socket) return <div>Connecting...</div>
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
                            {!started && <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME,
                                }))
                            }}>
                                Play
                            </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default GamePage
