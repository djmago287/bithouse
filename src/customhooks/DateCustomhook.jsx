import { useState } from "react";

export const UseDatecurrent = ()=>{
    const date = new Date();
    const [currentdate,setcurrentsetdate] = useState({
        "Year":date.getFullYear(),
        "Month" : date.getMonth()+1,
        "Day" : date.getDate(),
        "Hour" : date.getHours(),
        "Minute" : date.getMinutes()
        });
    return {currentdate};
}
export const UseDateformat = (date)=>{

    const formatdate  = (date) =>{
        //date format 0000-00-00
        const tmpdate =  new Date(date);
       return tmpdate.getFullYear()+"-"+(tmpdate.getMonth()+1)+"-"+tmpdate.getDate();
    }
       
    return {formatdate};
}
