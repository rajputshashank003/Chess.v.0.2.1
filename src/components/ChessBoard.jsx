import React, { useEffect, useState } from 'react'
import { GAME_OVER, MESSAGE, MOVE } from '../components/Messages.js';
import { toast } from "react-toastify";

function ChessBoard({color , started , chess , board, socket, setBoard, disabled ,showCharacters, specting}) {
    const [from , setFrom] = useState(null);
    useEffect( () =>{
        if(chess.inCheck()){
            socket.send(JSON.stringify({
                type: MESSAGE,
                message : "Check!!"
            }));
        };
        
    }, [board, chess]);

    const getReversedBoard = (originalBoard) => {
        return originalBoard.map(row => [...row].reverse()).reverse();
    };

    const renderedBoard = color === 'black' ? getReversedBoard(board) : board;

    const getSquareRepresentation = (i, j, reverse) => {
        const charRow = String.fromCharCode(97 + (j % 8));
        const intCol = 8 - i; 
        return reverse ? `${String.fromCharCode(97 + (7 - j % 8))}${1 + i}` : `${charRow}${intCol}`;
    };  
    
    return (
        <div className='text-white-200 '>
            {renderedBoard.map( (row , i) => {
                return <div key={i} className='flex'>
                    {row.map( (square, j) => {
                        const squareRepresent = getSquareRepresentation(i, j, color === 'black');
                        
                        return (    
                            <div key={j} onClick={ ()=> {
                                if(!started || specting ){
                                    // do nothing... eat 5 STAR
                                } else if(disabled){
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
                                    socket.send(JSON.stringify({
                                        type : MESSAGE,
                                        message : from + " to " + squareRepresent ,
                                    }));
                                }
                            }} className={`w-16 h-16 ${(i+j)%2 === 0 ? "bg-green-500" : "bg-green-100" } ` }>
                                <div className=" w-full flex justify-center h-full ">
                                    <div className={`flex justify-center h-full flex-col `}>
                                        {square ? <img 
                                                        className={`w-13 ${started && !specting && 'cursor-pointer hover:scale-110 '} ${from === squareRepresent ? "duration-300 animate-bounce " : "" }`} 
                                                        src={`/${square?.color === "b" ? 
                                                        square?.type : `${square?.type?.toUpperCase()} copy`}.png`} 
                                                    /> 
                                                    : 
                                                    null
                                        }
                                    </div>
                                    <div>{showCharacters && squareRepresent}</div>
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
