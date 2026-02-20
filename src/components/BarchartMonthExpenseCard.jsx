
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTypestyles } from "../customhooks/StylesCustomhook";

const ConCard = styled.section`
 background-color:white;
 flex:1;
 border-radius:4px;
    max-height: 297px;
`;
//this is show total in the current month.
export const CardBarchartExpenseMonth = ({data,typestyle})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const [fivemonths,setfivemonths] =  useState({
    name:[],
    totales:[]
  });
  
  
  const totalesIncomeMonth = async(data)=>{
    //calc months 
    var listmonthsincome={};
    data.map((item)=>{
     const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      const nMonth =  new Date(item.DateExpense).getMonth();
      const getMonth =  months[nMonth] ;
      if (!listmonthsincome[getMonth]) {
        listmonthsincome[getMonth]=0;
      }
      listmonthsincome[getMonth]+=parseFloat(item.ValueExpense);
    })
    setfivemonths({
      name:Object.keys(listmonthsincome),//[Enero,Febrero]
      totales:Object.values(listmonthsincome)}//[123,123]
    )
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
   //console.log(dataincome);
   totalesIncomeMonth(data);//#9c27b0;
 },[data]);
 
return(
 <ConCard>  
    <BarChart
      xAxis={[{ data: fivemonths.name }]}
      series={[{ data: fivemonths.totales, color:style }]}
      {...chartSetting}
    />
  </ConCard>);
  
}
