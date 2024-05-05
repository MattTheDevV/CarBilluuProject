import StatsCard from "./statsCard";
import { DashboardContext } from "../providers/dashboardProvider";
import { useContext } from "react";
import Alert from 'react-bootstrap/Alert';

function Dashboard() {
    const { dataa, loading, error } = useContext(DashboardContext);

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

    return ( 
    <div className='dashboardMain'>
            <StatsCard  
                perc={`${dataa.currency.percentage || 0}`}
                color="green"
                textRow1={`CZK ${dataa.currency.current || 0}`}
                textRow2="/ 10,000.00"
            />
            <StatsCard
                perc={`${dataa.consumption.percentage || 0}`}
                color="orange"
                textRow1={`l/100km ${dataa.consumption.current || 0}`}
                textRow2="/ 8.0"
            />
            <StatsCard
                perc={`${dataa.mileage.percentage || 0}`}
                color="blue"
                textRow1={`Km ${dataa.mileage.current || 0}`}
                textRow2="/ 5000.0"
            />
    </div>
    );
}

export default Dashboard;