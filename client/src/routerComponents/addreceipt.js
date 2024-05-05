import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function AddReceipt() {
    // Initializing state for each form field
    const [date, setDate] = useState('');
    const [fuelAmount, setFuelAmount] = useState('');
    const [price, setPrice] = useState('');
    const [currentMileage, setMileage] = useState('');
    const navigate = useNavigate();
    const [errorPosting, setErrorPosting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action

        // Format date from YYYY-MM-DD to MM-DD-YYYY

        const formData = {
            date: date,
            fuelAmount: parseFloat(fuelAmount),
            price: parseFloat(price),
            currentMileage: parseInt(currentMileage, 10)
        };

        try {
            const response = await fetch('http://10.0.0.114:8000/receipts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            setErrorPosting(true)
        }
    }

    return (
        <div className="contents" style={{margin:"auto", maxWidth:"800px", padding: "20px"}}>
            <h1 style={{textAlign: "left", color: "#494949", fontWeight: "600"}}>
                Add receipt
            </h1>

            
            {errorPosting && ( 
                <Alert variant={"danger"}>
                    Couldnt add new receipt, the server is not responding or the format is invalid
                </Alert>
            )}
            


            <Card style={{margin: "10px 0", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "15px", padding: "20px"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="dateInput">
                        <Form.Label style={{textAlign: "left", width: "100%", fontWeight: "600", fontSize: "larger"}}>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fuelAmountInput">
                        <Form.Label style={{textAlign: "left", width: "100%", fontWeight: "600", fontSize: "larger"}}>Amount of fuel (liters):</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={fuelAmount}
                            onChange={e => setFuelAmount(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priceInput">
                        <Form.Label style={{textAlign: "left", width: "100%", fontWeight: "600", fontSize: "larger"}}>Price (CZK):</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mileageInput">
                        <Form.Label style={{textAlign: "left", width: "100%", fontWeight: "600", fontSize: "larger"}}>Current mileage (Km):</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            value={currentMileage}
                            onChange={e => setMileage(e.target.value)}
                            required />
                    </Form.Group>
                    <Button variant="danger" type="submit" style={{width: "100%", backgroundColor: "#950b0b", border: "none"}}>
                        <span style={{fontWeight: "600"}}>Add fuel receipt</span>
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default AddReceipt;
