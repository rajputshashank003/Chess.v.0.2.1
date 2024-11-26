import React from "react";
import { Rnd } from "react-rnd";

function VideoCallElement({videoElement}) {
  return (
    <Rnd
      default={{
        x: 35,
        y: 100,
        width: 300,
        height: 190,
      }}
      minWidth={150} 
      minHeight={100} 
      bounds="window" 
      style={{
        border: "1px solid white",
        borderRadius: "8px",
        overflow: "hidden", 
        zIndex: 9999,
      }}
    >
        <video
            ref={videoElement}
            autoPlay
            playsInline
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                cursor: "move",
            }}
        ></video>
    </Rnd>
  );
}

export default VideoCallElement;