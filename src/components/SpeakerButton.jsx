import React, { useEffect } from 'react';

function SpeakerButton({ setAudioEffectsCanPlay , audioEffectsCanPlay }) {
    const handleAudioPlayButton = () => {
        setAudioEffectsCanPlay((prev) => !prev); 
    }
    return (
        <div onClick={handleAudioPlayButton}  className='h-fit p-1 cursor-pointer'>
            {audioEffectsCanPlay ? (
                <img className='h-6' src="/SpeakerOnIcon.png" alt="Speaker On" />
            ) : (
                <img className='h-6' src="/SpeakerOffIcon.png" alt="Speaker Off" />
            )}
        </div>
    );
}

export default SpeakerButton;
