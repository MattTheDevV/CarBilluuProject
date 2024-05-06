import './App.css';
import TopNavigation from "./components/TopNavigation"
import DashboardRoute from './routerComponents/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddReceipt from './routerComponents/addreceipt';
import ViewReceipt from './routerComponents/viewReceipt';

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardRoute />} />
          <Route path="/receipts/add" element={<AddReceipt />} />
          <Route path="/receipts/info" element={<ViewReceipt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
