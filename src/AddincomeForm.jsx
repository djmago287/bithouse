import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";         
import { Request_setincome } from "./infrastructure/request_getincome";
import styled from "styled-components";
//insert form the income for the client
const Conform = styled.section`
  background-color:white;
  border-radius:4px;
  display:flex;
  gap:1rem;
  padding:1rem;
  flex-wrap:wrap; 
`;
const Lbldate =  styled.label`
 color:black;
 display:flex;
 justify-content:center;
 align-items:center;
 min-Width:200px;
 flex:1
`;
const SelectMethod =  styled.select`
 flex: 1;
 min-Width:200px;
`;
export const Formaddincome = ({updatecomponent})=>{
  //income is ingresos in spanish
  const [income,setincome] =   useState('');
  const [description,setdescripcion] = useState('');
  const [methodpayment,setmethodpayment] = useState('Efectivo');
  const [date,setdate] = useState({
    "Year":"",
    "Month":"",
    "Day":"",
    "Hour":"",
    "Minute":""
  });
  const prevent = (e)=>{
    e.preventDefault();
  }
  const updatedate = ()=>{
    const date =  new Date();
    setdate({
      "Year":date.getFullYear(),
      "Month" : date.getMonth()+1,
      "Day" : date.getDate(),
      "Hour" : date.getHours(),
      "Minute" : date.getMinutes()
    })
  }
  const handlesetincome = (income,description,methodpayment)=>{
    //console.log(income +"--"+description+"---"+methodpayment);
    Request_setincome(income,description,methodpayment);
    updatecomponent();
  }
  useEffect(()=>{
    updatedate();
  },[]);
  return (
    <Conform onSubmit={prevent}>
    <TextField
   
    type="number"
    label="incomemoney" 
    variant="outlined" 
    value={income} 
    onChange={(e)=>setincome(e.target.value)} />
    <TextField
    sx={{flex:3,minWidth:290}}
    label="Descripción" 
    variant="outlined" 
    value={description} 
    onChange={(e)=>setdescripcion(e.target.value)} />
    <Lbldate>{`${date.Year}- ${date.Month} - ${date.Day}`}</Lbldate>
    <SelectMethod
    value={methodpayment}
    onChange={e=>setmethodpayment(e.target.value)}
    >
     <option value="Efectivo" >Efectivo</option>
     <option value="Transferencia" >Transferencia</option>
     <option value="Otros" >Otros</option>
    </SelectMethod>
    <Button
    sx={{flex:1,minWidth:150}}
    type="submit" 
    variant="contained" 
    onClick={()=>{ handlesetincome(income,description,methodpayment)  }}>Ingresar</Button>
  
        </Conform>);
  
}


