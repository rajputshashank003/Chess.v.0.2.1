import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard.jsx';
import Button from '../components/Button.jsx';
import UseSocket from '../hooks/useSocket.jsx';
import { Chess } from "chess.js";
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
import { toast } from 'react-toastify';
import OverlayGamePage from '../components/OverlayGamePage.jsx';
import CoordinateSwitch from '../components/CoordinateSwitch.jsx';
import GameDetails from '../components/GameDetails.jsx';

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
    const [onlineUsers , setOnlineUsers] = useState(0);

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
                    setOnlineUsers(message.users_count);
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
                    setBoard(message.message);
                    chess.move(message.payload);
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
        <>
        <div className='text-white flex flex-col'>
            <span className='flex text-gray-600 text-sm'><span className='text-gray-400 font-black'>{onlineUsers}</span> Online</span>
            <div className='flex justify-center items-center text-green-600 font-black text-3xl'>ChessV</div>
            {/* <div className='flex justify-center items-center text-green-600 font-black text-3xl'>
                <button onClick={ () => {
                    socket.send(JSON.stringify({
                        type : "recording_started",
                    }))
                } }>
                    start Record
                </button>
            </div> */}
        </div>
        <div className='flex justify-center max-sm:ml-2 ml-4 mr-4 '>
            <OverlayGamePage
                specting={specting}
                showLose={showLose}
                showWin={showWin}
                setShowLose={setShowLose}
                streamPage={streamPage}
                channelNumber={channelNumber}
                setChannelNumber={setChannelNumber}
                setStreamPage={setStreamPage}
                setSpecting={setSpecting}
                gamesCount={gamesCount}
                socket={socket}
                winner={winner}
                streamOver={streamOver}
                started={started}
            />
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 max-sm:flex max-sm:flex-col max-sm:items-center gap-4 w-full">
                    <div className='col-span-4 flex flex-col justify-center items-center '>
                        <div className={`text-white pl-1 inline-flex flex-start items-center h-10 bg-slate-900 mb-1 max-sm:w-222 w-111 rounded-sm `}>
                            <CoordinateSwitch showCharacters={showCharacters} handleShowCharacter={handleShowCharacter}/> 
                            {channelNumber > 0 && 
                                <span className="text-gray-400 duration-5 text-2xl items-center pr-2">
                                    <span className='text-gray-500 text-xl'>Channel &nbsp;</span>{channelNumber}
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
                        />
                        <div className={`text-white pl-1 h-10 inline-flex justify-center items-center bg-slate-900 mt-1 max-sm:w-222 w-111 rounded-sm `}>
                            {viewCount > 0 && 
                                <span className='text-gray-400 mr-2 text-lg'>
                                    <span className='text-gray-200 text-xl'>{viewCount}</span>&nbsp; viewer
                                </span>
                            }
                        </div>
                    </div>
                    <GameDetails
                        currUser={currUser} 
                        color={color} 
                        moveCount={moveCount} 
                        opponentsTurn={opponentsTurn} 
                        messages={messages} 
                        specting={specting}
                        handleMessageSubmit={handleMessageSubmit} 
                        started={started} 
                        findingPlayer={findingPlayer} 
                        socket={socket} 
                        channelNumber={channelNumber} 
                        gamesCount={gamesCount} 
                        setStreamPage={setStreamPage}
                        setFindingPlayer={setFindingPlayer}
                        handleChannelNumber={handleChannelNumber}
                    />
                </div>
            </div>
        </div>   
        </>
    );
}

export default GamePage;
