import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import {useState } from "react";
import styled from "styled-components"
import { UseDatecurrent } from "../customhooks/DateCustomhook";
import { Request_setexpense } from "../infrastructure/request_expense";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";
import { ToastView, useToast } from "./Toast";

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
export const FormExpense = ({updatecomponent})=>{
  const {currentdate} =  UseDatecurrent();
  const toast =  useToast();//this is all toast show in the layout
  const [formexpense,setformexpense] =  useState({
    ValueExpense:{
      value:'',
      error:false
    },
    DescriptionExpense:{
      value:'',
      error:false
    },
    PaymentmethodExpense:{
      value:'Efectivo',
      error:false
    },
    HourExpense:{
      value:currentdate.Hour+":"+currentdate.Minute,
      error:false
    },
    DateExpense:{
      value:currentdate.Year+"-"+currentdate.Month+"-"+currentdate.Day,
      error:false
    },
    TypeExpense:{
      value:'Food',
      error:false
    },
  })
  const validateformexpense =  async ()=>{
    if (formexpense.ValueExpense.error ||
      formexpense.DescriptionExpense.error ||
      formexpense.PaymentmethodExpense.error ||
      formexpense.HourExpense.error ||
      formexpense.DateExpense.error ||
      formexpense.TypeExpense.error
    ) {
      toast.inserttoast('Error:Llene todos los parametros','error');
       
      return false; 
    }else{
      return true;
    }
  }
  const handleaddexpense= async()=>{
    if(!validateformexpense()) return;
    const user =  useValidatelogin();
    const res = await Request_setexpense(
      user.getsessionuser().id,
      formexpense.ValueExpense.value,
      formexpense.DescriptionExpense.value,
      formexpense.PaymentmethodExpense.value,
      formexpense.DateExpense.value,
      formexpense.HourExpense.value,
      formexpense.TypeExpense.value);
        if(res.status=='OK') toast.inserttoast(`Nuevo ingreso :${formexpense.ValueExpense.value}$`,'success');
      updatecomponent();
  }
    return(<Conform onSubmit={(e)=>{e.preventDefault();handleaddexpense() }}>
            <TextField 
              required
              type="number" 
              label="Expensemoney" 
              variant="outlined" 
              error = {formexpense.ValueExpense.error}
              value={formexpense.ValueExpense.value}
              sx={{flex:1,minWidth:290}} 
              onChange={(e)=>{
                //validate if number of string
                /^\d+$/.test(e.target.value)?
                setformexpense({...formexpense,ValueExpense:{value:e.target.value, error:false}}):
                setformexpense({...formexpense,ValueExpense:{value:e.target.value,error:true}})
              }}
            /> 
            <TextField 
            required 
            error = {formexpense.DescriptionExpense.error}
            label="Description" 
            variant="outlined" 
            sx={{ flex:1, minWidth:200 }}
            value={formexpense.DescriptionExpense.value}
            onChange={(e)=>{
               //validate if is not empty
              e.target.value && e.target.value !=''?
              setformexpense({...formexpense,DescriptionExpense:{value:e.target.value,error:false}}):
              setformexpense({...formexpense,DescriptionExpense:{value:e.target.value,error:true}})
            }}
            /> 
            <FormControl  sx={{ flex:1, minWidth:200 }} color="secondary">
              <InputLabel   id="expensetype">Expense Type</InputLabel>
              <Select labelId="expensetype" label="Expense Type" color="secondary"
              value={formexpense.TypeExpense.value}
              onChange={e=>setformexpense({...formexpense,TypeExpense:{...formexpense.TypeExpense,value:e.target.value}})}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
              </Select> 
            </FormControl>
            <Typography sx={{ flex:1, minWidth:200, alignItems:"center",textAlign:"center"}}>
             {`${currentdate.Year}- ${currentdate.Month} - ${currentdate.Day} `}
              </Typography>
            <FormControl  sx={{ flex:1, minWidth:200 }} color="secondary">
              <InputLabel  id="paymentmethod">Payment Method</InputLabel>
              <Select labelId="paymentmethod" label="Payment Method" color="secondary"
              value={formexpense.PaymentmethodExpense.value}
              onChange={e=>setformexpense({...formexpense,PaymentmethodExpense:{...formexpense.PaymentmethodIncomeM,value:e.target.value}})}
              >
                <MenuItem value="Efectivo">Efectivo</MenuItem>
                <MenuItem value="transferencia">Transferencia</MenuItem>
                <MenuItem value="otro">Otros</MenuItem>
              </Select> 
            </FormControl>
            <Button    
            sx={{ flex:1, minWidth:200, alignItems:"center" }}
            type="submit" 
            variant="contained" >Add Expense</Button>
            <ToastView toasts={toast.listtoasts} />
        </Conform>)
}