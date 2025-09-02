import { useEffect, useState } from "react";
import styled from "styled-components";
import { Formaddincome } from "../AddincomeForm";
import { CardBarchartMonthIncome } from "../BarchartMonthIncomeCard";
import { CardCurrentValuesMonth } from "../CurrentValueMonthCard";
import { TableIncomeCard } from "../TableIncomeCard";
import { Request_lastmonths } from "../infrastructure/request_getincome";


const Containermain = styled.section`
  display:flex;
  flex-direction:column;
  gap: 1rem;
`;
const Conrow = styled.section`
  display:flex;
  flex-direction:row; 
  gap: 1rem;
  width:100%;
  flex-wrap:wrap-reverse;
`;
const Concol = styled.section`
  display:flex;
  flex-direction:column;
  gap:1rem;
  min-width:320px;
  flex: 1;
`;
export const  DashboardPage = ()=>
{
 const [updatecomponent,setupdatecomponent] =  useState(false);
 const [datacurrentmonth,setdatacurrentmonth] = useState([]);
 const [dataincome,setdataincome] =  useState([]);
 
 const handleupdatecomponent= ()=>{
  setupdatecomponent(!updatecomponent);
 } 
 //get data de last month 
 const getcurrentdatamonth=(data)=>{
  const date = new Date();
  const currentmonth = date.getMonth()+1;
  let tmpdataincome = [];
  data.map((item) => {
    const formatdate = new Date(item.DateIncomeM);
    const month = formatdate.getMonth()+1;
    if (month==currentmonth) {
      tmpdataincome.push(item);
    }
  })
  setdatacurrentmonth(tmpdataincome);
 } 
 //update data for edit formaseticomein
  const updatedata = async ()=>{
    const data = await Request_lastmonths(5);//get data de income  last 5 months
    getcurrentdatamonth(data);
    setdataincome(data);
 }

 useEffect(()=>{
  updatedata();
 },[updatecomponent]);

  const [open,setopen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return( 
   <Containermain>
      <div>
        <Formaddincome updatecomponent={handleupdatecomponent} />
      </div>
     <Conrow>
        <Concol>
           <CardBarchartMonthIncome dataincome={dataincome}/> 
        </Concol>
      <Concol>
        {datacurrentmonth.length>0 ? (        
          <CardCurrentValuesMonth datamonth={datacurrentmonth}/> ):null}
          <TableIncomeCard Sflex={2} Data={dataincome} ></TableIncomeCard> 
      </Concol>
     </Conrow>
    </Containermain>
  )
}
