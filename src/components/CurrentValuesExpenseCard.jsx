import { Typography } from "@mui/material";
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
    max-height: 90px;
`;  
//this is show total incomes in the current month.
export const CardCurrentValuesExpenseMonth = ({data,typestyle})=>{
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
  "Noviembre","Deciembre"];
  const datecurrent = new Date();  
  const [totalexpense,settotalexpense] =  useState(0);
 
  const totalIncomeCurrentMonth = (data)=>{
    
    let tmptotal = 0;
    data.map((item)=>{
      const getmonth = new Date(item.DateExpense).getMonth();
      if (getmonth==datecurrent.getMonth()) {
         tmptotal+=item.ValueExpense; 
      }
    })
    settotalexpense(tmptotal);
  }
  useEffect(()=>{
    totalIncomeCurrentMonth(data);
  },[data]);
  
return(<ConCard><Typography color="black" textAlign={'center'}>Total gastos actuales mes {months[datecurrent.getMonth()]} </Typography> 
  <Typography variant="h4"  color={typestyle?typestyle:'primary'}  textAlign="center">${totalexpense.toFixed(2)}</Typography> 
  </ConCard>);
  
}
