import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ConCard = styled.section`
  display:flex;
  padding:1rem;
  gap:1rem;
  background:white;
  flex-direction:row;
  border-radius:4px;
  flex:1;
  justify-content:space-around;
  align-items:center;
`;

const ItemCard = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  flex:1;
`;

export const SummaryCard = ({dataincome,dataexpense})=>{
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
  "Noviembre","Diciembre"];
  const datecurrent = new Date();
  const [totalincome,settotalincome] = useState(0);
  const [totalexpense,settotalexpense] = useState(0);

  const calcTotals = (income, expense)=>{
    let tmpincome = 0;
    let tmpexpense = 0;
    income.map((item)=>{
      if (new Date(item.DateIncomeM).getMonth()==datecurrent.getMonth()) {
        tmpincome+=parseFloat(item.ValueIncomeM);
      }
    })
    expense.map((item)=>{
      if (new Date(item.DateExpense).getMonth()==datecurrent.getMonth()) {
        tmpexpense+=parseFloat(item.ValueExpense);
      }
    })
    settotalincome(tmpincome);
    settotalexpense(tmpexpense);
  }

  useEffect(()=>{
    calcTotals(dataincome,dataexpense);
  },[dataincome,dataexpense]);

  const balance = totalincome - totalexpense;
  const balanceColor = balance >= 0 ? '#2e7d32' : '#d32f2f';

  return (
    <ConCard>
      <ItemCard>
        <Typography color="black" fontWeight="bold">Ingresos</Typography>
        <Typography variant="h5" color="primary">${totalincome.toFixed(2)}</Typography>
      </ItemCard>
      <ItemCard>
        <Typography color="black" fontWeight="bold">Gastos</Typography>
        <Typography variant="h5" color="secondary">${totalexpense.toFixed(2)}</Typography>
      </ItemCard>
      <ItemCard>
        <Typography color="black" fontWeight="bold">Utilidad</Typography>
        <Typography variant="h5" sx={{ color: balanceColor }}>${balance.toFixed(2)}</Typography>
      </ItemCard>
      <ItemCard>
        <Typography color="black" fontWeight="bold">Mes</Typography>
        <Typography variant="h6" color="text.secondary">{months[datecurrent.getMonth()]}</Typography>
      </ItemCard>
    </ConCard>
  );
}
