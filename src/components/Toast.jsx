import { Alert } from "@mui/material";
import { useState } from "react";
//use case  aplications
export const useToast = ()=>{
    const [listtoasts,setlisttoasts] =  useState([]);
    const inserttoast = (msg,typealert)=>{
        const id= Date.now();
        setlisttoasts([...listtoasts,{id,msg,typealert}]);
        setTimeout(() => {
        setlisttoasts(prev=>prev.filter(item=>item.id!==id))
        }, 2000); 
    }
   return {listtoasts,inserttoast};
}
//ui onremove es temporal
export const ToastView = ({toasts,onremove})=>{
    
    return ( 
        <div style={{position:'absolute',display:'flex',flexWrap:'wrap', flexDirection:'column',gap:5,bottom:'0px',left:'0px'}}>
        {
            toasts.map((item,i)=>{
            return(<ToastCustom key={i}   msg={item.msg} typealert={item.typealert}  />)
            })
        }
        </div>
       )
  }
const ToastCustom = ({ msg,typealert})=>{
   return (
        <Alert severity={typealert } variant="filled" sx={{zIndex:999}}> {/* "success", "error", "warning", "info"*/} 
            {msg}
        </Alert>
    )
}

