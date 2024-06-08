import React, { useState } from 'react'
import { MOVE } from '../pages/GamePage.jsx';
import { toast } from "react-toastify";

function ChessBoard({chess , board, socket, setBoard, disabled}) {
    const [from , setFrom] = useState(null);
    return (
        <div className='text-white-200'>
            {board.map( (row , i) => {
                return <div key={i} className='flex'>
                    {row.map( (square, j) => {
                        const squareRepresent = String.fromCharCode(97 + (j % 8)) + "" + (8 - i);
                        return (    
                            <div key={j} onClick={ ()=> {
                                if(disabled){
                                    toast.error("opponent's turn ");
                                } else if(!from){
                                    setFrom(squareRepresent);
                                } else {
                                    socket.send(JSON.stringify({
                                        type:MOVE,
                                        payload : {
                                            move : {
                                                from , 
                                                to : squareRepresent 
                                            }
                                        }
                                    }))
                                    setFrom(null);
                                    chess.move({
                                        from , 
                                        to : squareRepresent 
                                    });
                                    setBoard(chess.board());
                                    console.log({from , to : squareRepresent});
                                }
                            }} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-green-100'}`}>
                                <div className=" w-full flex justify-center h-full">
                                    <div className="flex justify-center h-full flex-col">
                                        {square ? <img className='w-13' src={`/${square?.color === "b" ? 
                                        square?.type : `${square?.type?.toUpperCase()} copy`}.png`} />: 
                                        null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            })}
        </div>
    )
}

export default ChessBoard
