import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ReceiptListContext = createContext();

// Provider component
export const ReceiptListProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/receipts/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);  // Empty dependency array added here

    return (
        <ReceiptListContext.Provider value={{ data, loading, error }}>
            {children}
        </ReceiptListContext.Provider>
    );
};
