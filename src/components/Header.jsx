import React from 'react'
import SpeakerButton from './SpeakerButton'

function Header({setAudioEffectsCanPlay, audioEffectsCanPlay, onlineUsers }) {
    return (
        <div className="flex p-1 w-full text-gray-600 text-sm items-center">
            <div className="flex-1">
                <SpeakerButton
                    setAudioEffectsCanPlay={setAudioEffectsCanPlay} 
                    audioEffectsCanPlay={audioEffectsCanPlay} 
                />
            </div>
            <div className="justify-end ">
                <span className="text-gray-400 font-black">
                    {onlineUsers}
                </span>
                Online
            </div>
        </div>
    )
}

export default Header
