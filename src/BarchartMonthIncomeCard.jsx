
import { Card } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTypestyles } from "./customhooks/StylesCustomhookj";

const ConCard = styled.section`
 background-color:white;
 flex:1;
 border-radius:4px;
`;
//this is show total incomes in the current month.
export const CardBarchartMonthIncome = ({dataincome,typestyle})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const [fivemonths,setfivemonths] =  useState({
    name:[],
    totales:[]
  });
  
  const handlefivemonth = ()=>{
    const date = new Date();
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  // the five finish month only update
    const tmpmonths = [];
    months.map((item,key)=>{
    if(key>=(date.getMonth()) & key<(date.getMonth()+5))
    {
    tmpmonths.push(item);  
    }
    })
    setfivemonths({...fivemonths,name:tmpmonths});
    
  }
  
  const totalesIncomeMonth = async(data)=>{
    const tmptotales = [];
    let i=0;
    const currentmonth = new Date().getMonth();
    
    for (let listmonth = currentmonth; listmonth <= currentmonth+4; listmonth++) {    
      tmptotales[i]=0;
      data.map((item) => {
        const month = new Date(item.DateIncomeM).getMonth();
        if (listmonth==month) {
          tmptotales[i]+=item.ValueIncomeM;
        }
      })
      i++;
    }
    setfivemonths(data=>({...data,totales:tmptotales}));
  }

  const chartSetting = {
    yAxis: [
      {
        label: 'Valor ($)',
        width: 50,
      },
    ],
    height: 297,
  };
 useEffect(()=>{
  //insertstyle
  insertstyle();
   handlefivemonth();
   totalesIncomeMonth(dataincome);//#9c27b0;
 },[dataincome]);
 
return(<ConCard>  
  <BarChart
    xAxis={[{ data: fivemonths.name }]}
    series={[{ data: fivemonths.totales, color:style }]}
    {...chartSetting}
  />
  </ConCard>);
  
}
