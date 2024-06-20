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
import { INIT_GAME , 
        MOVE ,
        GAMES_COUNT , 
        GAME_OVER , 
        MESSAGE , 
        SPECTARE, 
        INIT_SPECTING, 
        OPPONENT_DISCONNECT, 
        STREAM_OVER, 
        SPECTARE_CONNECTED, 
        CHANNEL_EXIST, 
        GAME_NOT_FOUND } 
        from '../components/Messages.js';
import StreamPage from '../components/StreamPage.jsx';
import { toast } from 'react-toastify';
import StreamOverPage from '../components/StreamOverPage.jsx';

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
    const [gamesCount , setGamesCount] = useState(0);
    const [streamPage , setStreamPage] = useState(false);
    const [specting , setSpecting ] = useState(false);
    const [streamOver , setStreamOver] = useState(false);
    const [viewCount , setViewCount] = useState(0);
    const [channelNumber , setChannelNumber] = useState(0);

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
                case GAMES_COUNT :
                    setGamesCount(message.games_count);
                    break;
                case INIT_GAME :
                    setBoard(chess.board());
                    setStarted(true);
                    setFindingPlayer(false);
                    setColor(message.payload.color);
                    console.log("game initialized ");
                    break;
                case INIT_SPECTING : 
                    setStarted(true);
                    setMoveCount(message.moveCount);
                    setBoard(message.message);
                    setChannelNumber(message.channelNumber);
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
                case SPECTARE :
                    setMoveCount(message.moveCount);
                    chess.move(message.payload);
                    setBoard(message.message);
                    break;
                case GAME_OVER : 
                    setGameOver(true);
                    setWinner(message.payload.winner === 'white' ? 'black' : 'white');
                    break;
                case OPPONENT_DISCONNECT :
                    setShowWin(true);
                    toast.success("Opponent Disconnected!");
                    break;
                case STREAM_OVER : 
                    if(message.payload.winner === 'white' || message.payload.winner === 'black'){
                        setWinner(message.payload.winner === 'white' ? 'black' : 'white');
                    } else {
                        setWinner(message.payload.winner);
                    }
                    setStreamOver(true);
                    break;
                case SPECTARE_CONNECTED :
                    toast.success("Viewer Connected ");
                    setViewCount((prev) => prev + 1);
                    break;
                case GAME_NOT_FOUND :
                    toast.error("Game not found !");
                    setSpecting(false);
                    break;
                case CHANNEL_EXIST : 
                    toast.error("Channel Exist!");
                    setFindingPlayer(false);
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

    const handleChannelNumber = (e) => {
        e.preventDefault();
        setChannelNumber(e.target.value);
    }
 
    return (
        <div className='flex justify-center'>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${showWin ? 'scale-100' : 'scale-0'}`}>
                    {!specting && !showLose && showWin && <Iwin />}
                </div>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${showLose ? 'scale-100' : 'scale-0'}`}>
                    {!specting && showLose && <OpponentWin setShowLose={setShowLose}/> }
                </div>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${streamPage ? 'scale-100' : 'scale-0'}`}>
                    {streamPage && <StreamPage channelNumber={channelNumber} setChannelNumber={setChannelNumber} setStreamPage={setStreamPage} setSpecting={setSpecting} gamesCount={gamesCount} socket={socket} />}
                </div>
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${streamOver ? 'scale-100' : 'scale-0'}`}>
                    {specting && streamOver && <StreamOverPage winner={winner}/>}
                </div>
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    
                    <div className='col-span-4 flex flex-col justify-center'>
                        <div className='text-white pl-1 inline-flex'>
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
                            {channelNumber && channelNumber > 0 && 
                                <span className="text-white duration-5 text-3xl flex items-center pr-2">
                                    <b>{channelNumber}</b>
                                </span>
                            }
                            {chess.inCheck() && 
                                <span className="text-gray-400 animate-pulse duration-5 text-xl flex items-center">
                                    CHECKMATE
                                    <Alert severity='warning' sx={{bgcolor:"transparent", marginLeft:"-0.8rem"}}/>
                                </span>
                            }   
                            {specting && 
                                <img src="./streaming.png" className='h-10 w-10 animate-pulse mr-2' alt="" />
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
                        />
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
                            {/* {viewers count} */}
                            <span className='text-white text-lg'>
                                {viewCount > 0 && <span>Viwers : <b>{viewCount}</b></span>}
                            </span>
                            {/* {message box } */}
                             
                            {started && <MessagesBox messages={messages} specting={specting} handleMessageSubmit={handleMessageSubmit}/> }
                            {/* {channel input } */}
                            {!started && <input
                                type="Number"
                                id="channelNumber"
                                name="channelNumber"
                                className="bg-gray-50 border h-10 w-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={"1 to 9999"}
                                min={1}
                                max={9999}
                                value={channelNumber}
                                onChange={handleChannelNumber}
                            /> }
                            {/* Button to start the game */}
                            {!started && !findingPlayer && (
                                <div className='flex flex-row space-x-2'>
                                    <Button
                                        onClick={() => {
                                            socket.send(JSON.stringify({ type: INIT_GAME , channel : channelNumber }));
                                            setFindingPlayer(true);
                                        }}
                                        h={"12"}
                                        w={"36"}
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
                                    </Button>}
                                </div>
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
