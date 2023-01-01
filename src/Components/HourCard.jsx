import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Table } from "react-bootstrap"
import {ICON_MAP} from "../Icongiver"
export const HourCard = ({hourData}) =>{
  const Day_formatter = new Intl.DateTimeFormat(undefined,{weekday:"long"})
  const Time_formatter = new Intl.DateTimeFormat(undefined,{hour:"numeric"})
    return(
        <Table striped bordered hover style={{width:"100%",textAlign:"center",borderSpacing:"0"}}>
            <tbody>
           { 
           hourData?.map((x,i)=>{
           const {time,temp,flTemp,wind,precip,icon} = x
            return (
            <tr className="hourRow" key={i}>
            <td>
                <div className="label">
                    {Day_formatter.format(time)}
                </div>
                <div>
                    {Time_formatter.format(time)}
                </div>
            </td>

            <td>
                <FontAwesomeIcon icon={ICON_MAP.get(icon)} style={{width:"50px",height:"50px"}} />
            </td>

            <td> 
                <div className="label">
                    TEMP
                </div>
                <div>
                    {temp}&deg;C
                </div>
            </td>
            <td>
            <div className="label">
                    FL TEMP
                </div>
                <div>
                    {flTemp}&deg;C
                </div>
            </td>
            <td>
            <div className="label">
                    WIND
                </div>
                <div>
                    {wind}mph
                </div>
            </td>
            <td> <div className="label">
                    PRECIP
                </div>
                <div>
                    {precip}in
                </div></td>
        </tr>)
           })

            }
            </tbody>
        </Table>
    )
}