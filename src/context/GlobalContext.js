import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isReaded, setIsReaded] = useState(false);
    useEffect(() => {
        const socket = io("http://localhost:5000");
        setSocket(socket);
        return () => socket.close();
    }, []);
    return (
        <DataContext.Provider
            value={{ socket, setSocket, isReaded, setIsReaded }}
        >
            {children}
        </DataContext.Provider>
    );
};
