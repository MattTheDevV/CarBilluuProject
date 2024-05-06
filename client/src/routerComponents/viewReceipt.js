import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Alert } from 'react-bootstrap';
import SectionDivier from "../components/sectionDivider"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ViewReceipt({ }) {
    const [receipt, setReceipt] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleRedirect = (path) => {
        navigate(path)
    }

    const id = localStorage.getItem("receiptId")

    async function fetchReceiptData(receiptId) {
        try {
            const response = await fetch('http://10.0.0.114:8000/receipts/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: receiptId })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setReceipt(data);
        } catch (e) {
            console.error("Failed to fetch receipt data:", e);
            setError("Failed to load receipt. Please try again later.");
        }
    }

    useEffect(() => {
        if (id) {
            fetchReceiptData(id);
        }
    }, [id]);  // Dependency array with id ensures this runs when id changes

    
    async function handleDeleteReceipt() {
        try {
            const response = await fetch('http://10.0.0.114:8000/receipts/delete', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Redirect to the dashboard on successful delete
            navigate("/");
        } catch (e) {
            console.error("Failed to delete receipt:", e);
            setError("Failed to delete receipt. Please try again later.");
        }
    }

    if (error) {
        return (
            <Alert variant={"danger"}>
                    Couldnt delete receipt, the server isnt responding or the form is invalid
            </Alert>
        );
    }

    if (!receipt) {
        return <div>Loading...</div>;
    }
    const pricePerUnit = (receipt.price / receipt.fuelAmount).toFixed(2);

    const fuelConsum = (receipt.fuelAmount/receipt.drivenSinceLastRefuel);

    return (
        <div className="contents" style={{margin:"auto", maxWidth:"800px", padding: "20px"}}>
        <h1 style={{textAlign: "left", color: "#494949", fontWeight: "600", width: "100%"}}>
            Receipt info
        </h1>

        
        {error && ( 
            <Alert variant={"danger"}>
                Couldnt load receipt data. 
            </Alert>
        )}
        

        <Card style={{margin: "10px 0", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "15px", padding: "20px"}}>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Date:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>{receipt.date}</h1>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Amount of fuel:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#346ee3"}}>{(receipt.fuelAmount).toFixed(1)} liters</h1>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Price per liter:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#2aa856"}}>{pricePerUnit} CZK</h1>
                </div>
                <SectionDivier />
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Price total:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#2aa856"}}>{(receipt.price).toFixed(2)} CZK</h1>
                </div>
                <SectionDivier />
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Mileage status:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>{(receipt.currentMileage).toFixed(1)} Km</h1>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Driven since last refuel:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>{(receipt.drivenSinceLastRefuel != "--" ? (receipt.drivenSinceLastRefuel.toFixed(2)) : receipt.drivenSinceLastRefuel)} Km</h1>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center"}}>
                   <h1 style={{textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>Average fuel consumption:</h1>
                   <h1 style={{textAlign: "right", width: "100%", fontWeight: "bold", fontSize: "25px", color: "#494949"}}>{(fuelConsum ? ((fuelConsum*100).toFixed(2)) : "--")} liters / 100Km</h1>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", justifyItems: "center", marginTop: "10px"}}>
                    <Button variant="danger" onClick={handleDeleteReceipt} style={{width: "45%", backgroundColor: "#950b0b", border: "none"}}>
                        <span style={{fontWeight: "600"}}>Delete receipt</span>
                    </Button>
                    <Button variant="danger" onClick={() => navigate("/")} style={{width: "45%", backgroundColor: "#346ee3", border: "none"}}>
                        <span style={{fontWeight: "600"}}>Back to dashboard</span>
                    </Button>
                </div>
        </Card>
    </div>
    );
}

export default ViewReceipt;
