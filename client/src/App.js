import './App.css';
import TopNavigation from "./components/TopNavigation"
import Dashboard from './components/dashboard';
import Button from 'react-bootstrap/Button';
import TextDivider from './components/sectionDivider';



function App() {
  return (
    <div className="App">
      <TopNavigation />
      <div className="contents" style={{margin:"auto", maxWidth:"800px", padding: "20px"}}> 
        <h1 style={{textAlign: "left", color: "#494949", fontWeight: "600"}}>
          Welcome, Matt!
        </h1>
        <TextDivider text="Dashboard"/>
        <Dashboard/>
        <Button style={{ boxSizing: "border-box", width:"100%", borderRadius: "15px", height:"70px", backgroundColor: "#950b0b", border: "none", fontSize:"xx-large", fontWeight: "600", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          Add fuel receipt +
        </Button>
        <TextDivider text="Receipts"/>
      </div>
    </div>
  );
}

export default App;
