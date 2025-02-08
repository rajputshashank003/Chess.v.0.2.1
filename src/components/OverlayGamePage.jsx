import React, { useEffect, useState } from 'react'
import Iwin from './Iwin.jsx'
import OpponentWin from './OpponentWin.jsx'
import StreamPage from './StreamPage.jsx'
import StreamOverPage from './StreamOverPage.jsx'
import Gamestarted from './Gamestarted.jsx'

function OverlayGamePage({started , streamOver ,specting , showLose , showWin , setShowLose, streamPage , channelNumber, setChannelNumber, setStreamPage , setSpecting , gamesCount ,socket, winner
    ,betAmount
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setVisible(started);
        }, 100);

        return () => clearTimeout(startTimer);
    }, [started]);

    useEffect(() => {
        let hideTimer;
        if (visible) {
            hideTimer = setTimeout(() => {
                setVisible(false);
            }, 1000);
        }
        return () => clearTimeout(hideTimer);
    }, [visible]);

    return (
        <>
            <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${showWin ? 'scale-100' : 'scale-0'}`}>
                {!specting && !showLose && showWin && <Iwin betAmount={betAmount} />}
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
            {
                visible && 
                <div className={`fixed h-full w-full z-50 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ${visible ? 'scale-100' : 'scale-0'}`}>
                    {<Gamestarted />}
                </div>
            }
        </>
    )
}

export default OverlayGamePage
