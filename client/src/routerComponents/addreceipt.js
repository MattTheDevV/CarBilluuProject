import Card from 'react-bootstrap/Card';

function AddReceipt() {
    return ( 
    <div className="contents" style={{margin:"auto", maxWidth:"800px", padding: "20px"}}> 
        <h1 style={{textAlign: "left", color: "#494949", fontWeight: "600"}}>
          Add receipt
        </h1>
        <div>
        <Card style={{margin: "10px 0 10px 0", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "15px"}}>
            
        </Card>
        </div>
      </div>
    );
}

export default AddReceipt;