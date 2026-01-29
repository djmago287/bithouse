import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components"

const Conform =  styled.form`
  background-color:white;
  border-radius:4px;
  display:flex;
  gap:1rem;
  padding:1rem;
  flex-wrap:wrap;
  color:black;
  align-items:center;
`;
export const FormExpense = ()=>{
  const [date,setdate] = useState({});
  const updatedate =()=>{
    const date =  new Date();
    setdate({
      "Year":date.getFullYear(),
      "Month" : date.getMonth()+1,
      "Day" : date.getDate(),
      "Hour" : date.getHours(),
      "Minute" : date.getMinutes()
    })
  }
  const handleaddexpense=()=>{
    //logic to add expense
    console.log("Add expense logic to be implemented");
  }
  useEffect(()=>{
    updatedate();
  },[])
    return(<Conform onSubmit={(e)=>{e.preventDefault();handleaddexpense() }}>
        <TextField type="number" label="Expensemoney" variant="outlined" sx={{flex:1,minWidth:290}} /> 
        <TextField  label="Description" variant="outlined" sx={{ flex:1, minWidth:200 }}/> 
        <FormControl  sx={{ flex:1, minWidth:200 }} color="secondary">
          <InputLabel   id="expensetype">Expense Type</InputLabel>
          <Select labelId="expensetype" label="Expense Type" color="secondary">
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
          </Select> 
        </FormControl>
        <Typography sx={{ flex:1, minWidth:200, alignItems:"center"}}>{`${date.Year} -${date.Month} - ${date.Day}`} </Typography>
        <FormControl  sx={{ flex:1, minWidth:200 }} color="secondary">
          <InputLabel  id="paymentmethod">Payment Method</InputLabel>
          <Select labelId="paymentmethod" label="Payment Method" color="secondary">
            <MenuItem value="Efectivo">Efectivo</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
            <MenuItem value="otro">Otros</MenuItem>
          </Select> 
        </FormControl>
        <Button    
        sx={{ flex:1, minWidth:200, alignItems:"center" }}
        type="submit" 
        variant="contained" >Add Expense</Button>
        </Conform>)
}