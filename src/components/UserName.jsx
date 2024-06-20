import React, { useState, useEffect } from 'react';

function UserName() {
    const [currUser, setCurrUser] = useState(() => {
        const storedUser = localStorage.getItem("currUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (currUser) {
            localStorage.setItem("currUser", JSON.stringify(currUser));
        }
    }, [currUser]);

    const handleChange = (e) => {
        e.preventDefault();
        const newUser = e.target.value;
        setCurrUser(newUser);
        localStorage.setItem("currUser", JSON.stringify(newUser));
    };

    return (
        <div>
            <label htmlFor="player_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Player Name
            </label>
            <input
                onChange={handleChange}
                type="text"
                id="player"
                name="player_name"
                className="bg-gray-50 border h-12 w-56 pr-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={currUser ? currUser : "Guest User"}
                required
                value={currUser || ""}
            />
        </div>
    );
}

export default UserName;
