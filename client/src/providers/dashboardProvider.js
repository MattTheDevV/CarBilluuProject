import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const DashboardContext = createContext();

// Provider component
export const DashboardProvider = ({ children }) => {
    const [dataa, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetching");
                const response = await fetch('http://localhost:8000/dashboard/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "currencyMax": 5000, // target money spent for given month
                        "consumptionMax": 10, // target average consumption for given month
                        "mileageMax": 5000 // max target mileage for given month
                    })
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
        <DashboardContext.Provider value={{ dataa, loading, error }}>
            {children}
        </DashboardContext.Provider>
    );
};
