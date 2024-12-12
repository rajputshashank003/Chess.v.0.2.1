import React, { useState, useEffect, useRef } from "react";

const TypingEffect = ({ tipText, delay = 50 ,audioEffectsCanPlay}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentIndex < tipText.length) {
      if(audioRef.current && audioRef.current.paused && audioEffectsCanPlay) {
        audioRef.current.play(); 
      }
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + tipText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentIndex, delay, tipText]);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentText("");
  }, [tipText]);

  return (
    <span>
      {currentText}
      <audio ref={audioRef} src="/TypingEffectAudio.mp3" loop></audio>
    </span>
  );
};

export default TypingEffect;
