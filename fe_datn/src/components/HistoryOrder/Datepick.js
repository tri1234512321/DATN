import React,{ useState } from "react";
import "./HistoryOrder.scss";

function DatePick(){
    const [date,setDate] = useState();
    console.log("Date",date);
    return (
        <input className="time" type="date" onChange={(e)=>setDate(e.target.value)}/>
    );
};

export default DatePick;