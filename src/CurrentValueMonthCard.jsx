import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";


const ConCard =  styled.section`
 display:flex;
 padding:1rem;
 gap:1rem;
  background:white;
  flex-direction:column;
  border-radius:4px;
  flex:1;
`;  
//this is show total incomes in the current month.
export const CardCurrentValuesMonth = ({datamonth})=>{
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
  "Noviembre","Deciembre"];
  const date = new Date();  
  const [totalincome,settotalincome] =  useState(0);
  const totalIncomeCurrentMonth = (data)=>{
    let tmptotal = 0;
    data.map((item)=>{
      
      tmptotal+=item.ValueIncomeM; 
    });
    settotalincome(tmptotal);
  }
  useEffect(()=>{
    totalIncomeCurrentMonth(datamonth);
  },[datamonth]);
  
return(<ConCard><Typography color="black" textAlign={'center'}>Total ingresos actuales mes {months[date.getMonth()]} </Typography> 
  <Typography variant="h4"  color="primary"  textAlign="center">${totalincome.toFixed(2)}</Typography> 
  </ConCard>);
  
}
