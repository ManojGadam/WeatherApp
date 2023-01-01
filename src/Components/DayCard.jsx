import { Card } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const DayCard = ({icon,temp,day}) =>{
    return(
        <Card className="dayCard" >
            <FontAwesomeIcon icon={icon} style={{width:"50px",height:"50px"}} size="lg" />
            <Card.Body className="flexDown alignCenter">
                <Card.Text>{day}</Card.Text>
                <Card.Title>{temp}&deg;C</Card.Title>
            </Card.Body>
        </Card>
    )
}