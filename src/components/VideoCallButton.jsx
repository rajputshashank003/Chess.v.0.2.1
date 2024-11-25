import { useEffect, useState } from 'react';

function VideoCallButton({ wantsVideoAudio }) {
    const [isVideoOn, setIsVideoOn] = useState(wantsVideoAudio);

    useEffect(() => {
        setIsVideoOn(wantsVideoAudio);
    }, [wantsVideoAudio]);

    return (
        <>
            <label
                htmlFor="videoCheckbox"
                className="relative w-12 h-12 flex justify-center items-center bg-gray-700 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out"
            >
                {/* Video ON Icon */}
                <div
                    className={`${
                        isVideoOn ? 'opacity-100 z-10' : 'opacity-0'
                    } w-full h-full flex justify-center items-center transition-all ease-in-out`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-camera-video-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm13.991-.993-3.857 2.606v2.778l3.857 2.606A.5.5 0 0 0 14.5 12V4a.5.5 0 0 0-.509-.493z" />
                    </svg>
                </div>

                {/* Video OFF Icon */}
                <div
                    className={`${
                        !isVideoOn ? 'opacity-100 z-10' : 'opacity-0'
                    } absolute inset-0 w-full h-full flex justify-center items-center transition-all ease-in-out`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-camera-video-off-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M10.854 6.146 9.121 7.879 7.88 6.646a.5.5 0 1 0-.707.707L8.414 8.586 6.646 10.354a.5.5 0 1 0 .708.707L9.121 9.293l1.732 1.732a.5.5 0 0 0 .707-.707L9.828 8.586l1.732-1.732a.5.5 0 0 0-.707-.707zm-8.22-4.81A.5.5 0 0 1 3 2h6a2 2 0 0 1 2 2v1.879l2.572-1.714A.5.5 0 0 1 14.5 4v8a.5.5 0 0 1-.772.416L11 10.5V12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-.356.097-.69.267-.976l-.854-.854a.5.5 0 0 1 .708-.708l13 13a.5.5 0 0 1-.708.708l-2.413-2.413-1.572-1.572L2.634 1.335z" />
                    </svg>
                </div>
            </label>
        </>
    );
}

export default VideoCallButton;
