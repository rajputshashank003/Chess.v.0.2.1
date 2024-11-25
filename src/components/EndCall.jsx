import { useEffect, useState } from 'react';

function EndCall({ }) {
    const [isCallActive, setIsCallActive] = useState(true);

    return (
        <>
            <label
                htmlFor="endCallCheckbox"
                className="relative w-12 h-12 flex justify-center items-center bg-gray-700 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out"
            >
                {/* Call Active Icon */}
                <div
                    className={`${
                        isCallActive ? 'opacity-100 z-10' : 'opacity-0'
                    } w-full h-full flex justify-center items-center transition-all ease-in-out`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.654 1.328a.678.678 0 0 1 .736-.223l2.647.765c.39.113.678.443.71.838l.222 2.56c.03.34-.082.678-.31.936L6.432 7.22a11.678 11.678 0 0 0 5.001 5.001l1.016-1.016c.259-.228.596-.34.936-.31l2.56.222c.395.032.725.32.838.71l.765 2.647a.678.678 0 0 1-.223.736l-2.28 2.28a.678.678 0 0 1-.708.183C9.802 15.368 4.854 10.42 1.305 3.79a.678.678 0 0 1 .183-.708l2.28-2.28z" />
                    </svg>
                </div>

                {/* Call Ended Icon */}
                <div
                    className={`${
                        !isCallActive ? 'opacity-100 z-10' : 'opacity-0'
                    } absolute inset-0 w-full h-full flex justify-center items-center transition-all ease-in-out`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-telephone-x-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.144 10.086a.678.678 0 0 1 .183-.708l1.016-1.016a11.678 11.678 0 0 0-5.001-5.001L6.847 4.148a.678.678 0 0 1-.936.31l-2.56-.222c-.395-.032-.725-.32-.838-.71L1.689.879A.678.678 0 0 1 1.912.143l2.28 2.28a.678.678 0 0 1 .183.708C4.854 5.58 9.802 10.528 13.43 13.973a.678.678 0 0 1-.708-.183l-2.28-2.28zm.853-.646 1.415-1.415a.5.5 0 0 1 .708.708l-1.415 1.415 1.415 1.415a.5.5 0 0 1-.708.708L12 10.293l-1.415 1.415a.5.5 0 0 1-.708-.708l1.415-1.415-1.415-1.415a.5.5 0 1 1 .708-.708L12 9.586z" />
                    </svg>
                </div>
            </label>
        </>
    );
}

export default EndCall;
