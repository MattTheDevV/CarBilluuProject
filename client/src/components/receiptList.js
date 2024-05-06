import { useContext } from "react";
import { ReceiptListContext } from "../providers/receiptListProvider";
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '@mdi/react';
import { mdiArrowRightThick } from '@mdi/js';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";

function ReceiptList() {
    const { data, loading, error } = useContext(ReceiptListContext);
    const navigate = useNavigate()

    const handleShowReceipt = (receiptId) => {
        localStorage.setItem("receiptId", receiptId)
        navigate("/receipts/info")
    }

    if (loading) {
        return (
        <Alert variant={"primary"}>
          Loading component, please wait...
        </Alert>
        ); // Display errors if any
        
    }

    if (error) {
        return (
        <Alert key={"danger"} variant={"danger"}>
          {error.message}
        </Alert>
        ); // Display errors if any
        
    }

    if (!data || Object.keys(data).length === 0) return <div>No receipts found.</div>;

    return (
        <div className='receiptListMain'>
            <Accordion defaultActiveKey="0">
                {Object.entries(data).map(([month, receipts], index) => (
                    <Accordion.Item eventKey={index.toString()} key={month} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <Accordion.Header>{month}</Accordion.Header>
                        <Accordion.Body>
                            {receipts.map((receipt) => (
                                <div key={receipt.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', width: "100%"}}>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <h2 style={{fontWeight: "bold", color: " #494949 "}}>{receipt.date}</h2>
                                        <h2 style={{fontWeight: "bold", color: " green "}}>CZK {receipt.price.toFixed(2)}</h2>
                                    </div>
                                    <a className="clickHover" onClick={() => handleShowReceipt(receipt.id)} style={{backgroundColor: "red", width: "100%", textDecoration: "none"}}>
                                        <div style={{width: "100%", backgroundColor: "#950b0b", height: "50px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px"}}>
                                            <h3 style={{color: "white", fontWeight: "600", marginBottom: "0"}}>View receipt</h3>
                                            <Icon path={mdiArrowRightThick} size={1} color={"white"}/>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

export default ReceiptList;
