import Card from 'react-bootstrap/Card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function StatsCard(props) {
    return ( 
    <Card style={{margin: "10px 0 10px 0", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "15px"}}>
      <Card.Body style={getStyle()}>
      
        <CircularProgressbar
            value={props.perc}
            text={`${props.perc}%`}
            strokeWidth="12"
            styles={buildStyles({
                pathColor: props.color,
                textColor: "black",
            })}
        />

        <div style={{display: "grid"}}>
            <h2 style={{textAlign: "right", fontWeight: "bold", color: " #494949 "}}>
                {props.textRow1}
            </h2>
            <h2 style={{textAlign: "right", fontWeight: "bold", color: " #494949 "}}>
                {props.textRow2}
            </h2>
        </div>
      </Card.Body>
    </Card>
    );
}

function getStyle(){
    return {
        display:"grid",
        gridTemplateColumns: "120px auto",
    }
}

export default StatsCard;