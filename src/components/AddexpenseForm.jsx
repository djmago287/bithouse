import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { UseDatecurrent } from "../customhooks/DateCustomhook";

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
  const {currentdate} =  UseDatecurrent();
  const [formexpense,setformexpense] =  useState({
    ValueExpense:{
      value:'',
      status:'false'
    },
    DescriptionExpense:{
      value:'',
      status:'false'
    },
    PaymentmethodExpense:{
      value:'',
      status:'false'
    },
    HourmethodExpense:{
      value:'',
      status:'false'
    },
    DateExpense:{
      value:currentdate.Year+"-"+currentdate.Month+"-"+currentdate.Day,
      status:'true'
    },
    TypeExpense:{
      value:currentdate.Hour+":"+currentdate.Minute,
      status:'true'
    },
  })

  const handleaddexpense= async()=>{
  
    //logic to add expense
    console.log("Add expense logic to be implemented");
  }

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
            <Typography sx={{ flex:1, minWidth:200, alignItems:"center",textAlign:"center"}}>
             {`${currentdate.Year}- ${currentdate.Month} - ${currentdate.Day} `}
              </Typography>
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