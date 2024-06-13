import React, { useEffect, useState } from 'react'

function UseSocket() {
    const [socket , setSocket ] = useState(null);
    useEffect( () => {
        const ws = new WebSocket(import.meta.env.VITE_API_WS_URL);
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
