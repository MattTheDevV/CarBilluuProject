import Dashboard from '../components/dashboard';
import Button from 'react-bootstrap/Button';
import TextDivider from '../components/sectionDivider';
import { DashboardProvider } from '../providers/dashboardProvider';
import { ReceiptListProvider } from '../providers/receiptListProvider';
import ReceiptList from '../components/receiptList';

function DashboardRoute() {
    return ( 
        <div className="contents" style={{margin:"auto", maxWidth:"800px", padding: "20px"}}> 
        <h1 style={{textAlign: "left", color: "#494949", fontWeight: "600"}}>
          Welcome, Matt!
        </h1>
        <TextDivider text="Dashboard"/>
        <DashboardProvider>
        <Dashboard/>
        </DashboardProvider>
        <Button style={{ boxSizing: "border-box", width:"100%", borderRadius: "15px", height:"70px", backgroundColor: "#950b0b", border: "none", fontSize:"xx-large", fontWeight: "600", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <a style={{textDecoration: "none", color: "white"}} href="/receipts/add">Add fuel receipt +</a>
        </Button>
        <TextDivider text="Receipts"/>
        <ReceiptListProvider>
          <ReceiptList/>
        </ReceiptListProvider>
        <TextDivider text="Matěj Šenk, 2024"/>
      </div>
    );
}

export default DashboardRoute;