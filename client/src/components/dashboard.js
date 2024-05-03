import StatsCard from "./statsCard";

function dashboard() {
    return ( 
    <div className='dashboardMain'>
        <StatsCard  
            perc="100"
            color="green"
            textRow1="CZK 9999.90"
            textRow2="/ 10,000.00"
        />
        <StatsCard
            perc="90" 
            color="orange"
            textRow1="l / 100km 7.7"
            textRow2="/ 8.0"
        />
        <StatsCard
            perc="80" 
            color="blue"
            textRow1="Km 3289.7"
            textRow2="/ 5000.0"
        />
    </div>
    );
}

export default dashboard;