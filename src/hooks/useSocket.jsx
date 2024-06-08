import React, { useEffect, useState } from 'react'
const WS_URL = "https://chess-v2-api-jjbf.onrender.com";
// const WS_URL = "ws://localhost:8080";

function UseSocket() {
    const [socket , setSocket ] = useState(null);
    useEffect( () => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }
        ws.onclose = () => {
            setSocket(null); 
        } 
        return () => {
            ws.close();
        }
    },[])
    return (
        socket
    )
}

export default UseSocket
