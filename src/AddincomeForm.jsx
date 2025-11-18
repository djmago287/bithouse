import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
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
  const [typeincome,settypeincome] = useState('Otros');
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
    Request_setincome(income,description,methodpayment,typeincome);
    updatecomponent();
  }
  useEffect(()=>{
    updatedate();
  },[]);
  return (
    <Conform onSubmit={prevent}>
    <TextField
     sx={{flex:1,minWidth:290}}
    type="number"
    label="incomemoney" 
    variant="outlined" 
    value={income} 
    onChange={(e)=>setincome(e.target.value)} />
    <TextField
    sx={{flex:1,minWidth:290}}
    label="Descripción" 
    variant="outlined" 
    value={description} 
    onChange={(e)=>setdescripcion(e.target.value)} />
    <FormControl  sx={{flex:1, minWidth:200 }}  color="secondary">
      <InputLabel  id="incometype">Income Type</InputLabel>
      <Select 
      labelId="incometype" 
      label="Income Type"
      onChange={e=>settypeincome(e.target.value)}
      value={typeincome} 
      color="secondary">
        <MenuItem value="CobroDeuda">Cobro Deuda</MenuItem>
        <MenuItem value="Rentas">Rentas</MenuItem>
        <MenuItem value="Salario">Salario</MenuItem>
        <MenuItem value="Otros">Otros</MenuItem>
      </Select> 
    </FormControl>
    <Lbldate>{`${date.Year}- ${date.Month} - ${date.Day}`}</Lbldate>
    <FormControl sx={{flex:1,minWidth:200}}color="secondary">
       <InputLabel id="methodpayment" >Methodpayment</InputLabel>
       <Select
       color="secondary"
        label="Methodpayment"
        value={methodpayment}
        onChange={e=>setmethodpayment(e.target.value)}
        >
        <MenuItem value="Efectivo" >Efectivo</MenuItem>
        <MenuItem value="Transferencia" >Transferencia</MenuItem>
        <MenuItem value="Otros" >Otros</MenuItem>
      </Select>
    </FormControl>
    <Button
    sx={{flex:1,minWidth:150}}
    type="submit" 
    variant="contained" 
    onClick={()=>{ handlesetincome(income,description,methodpayment)  }}>Ingresar</Button>
  
        </Conform>);
  
}


