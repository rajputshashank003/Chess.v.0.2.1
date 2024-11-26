import React, { useEffect, useRef } from 'react'

function MessagesBox({messages, handleMessageSubmit , specting , handleMessageSubmitToAll , started}) {
    const scrollableRef = useRef(null);

    useEffect(() => {
        if (scrollableRef.current) {
          scrollableRef.current.scrollTo({ top: scrollableRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, [messages]);

    return (
        <div className="flex flex-col relative w-72 h-50">
            {messages.length > 0 && 
                <ul ref={scrollableRef} className='mb-2 text-white border border-white rounded p-2 h-fit max-h-36 overflow-auto no-scrollbar w-72 max-sm:w-60 max-sm:max-h-28'>
                    {messages.map((message, index) => (
                        <li key={index} className={`flex ${message.owner === 'sender' ? 'justify-end text-sky-300' : 'justify-start text-sky-100'} p-0.5`}>
                            {message.message}
                        </li>
                    ))}
                </ul>
            }
            {   !specting && 
                <form onSubmit={started ? handleMessageSubmit : handleMessageSubmitToAll} className="flex space-x-2 mb-2 mt-auto">
                    <input
                        type="text"
                        id="new_message"
                        name="new_message"
                        className="bg-gray-50 border h-18 w-60 pr-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={started ? "New Message" : "New message to all"} 
                        required
                    />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </form>
            }
        </div>
    )
}

export default MessagesBox