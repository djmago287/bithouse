import { useState } from "react";

export const useTypestyles =({type})=>{
    //primary secondary
    const [style,setstyle] = useState();
    const insertstyle = ()=>{
        if(type){
            if(type==="primary") setstyle('#1976d2');
            if(type==="secondary") setstyle('#9c27b0');
            if(type!=="primary" & type!=="secondary") {
                console.log("type no valid, set default primary");
                setstyle('#1976d2');
            }
        }else{
            setstyle('#1976d2');
        };
      
    }
    return {style,insertstyle};
}