import { useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { Formaddincome } from "../components/AddincomeForm";
import { Request_lastmonths } from "../infrastructure/request_getincome";
import { Navbar_IncomeExpenses } from "../components/Navbar_IncomeExpenses";
import { FormExpense } from "../components/AddexpenseForm";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";
import {Request_Nmonthsexpenses } from "../infrastructure/request_expense";
import { IncomeMetricsLayout } from "../layouts/IncomeMetricsLayout";
import { ExpensesMetricsLayout } from "../layouts/ExpensesMetricsLayout";


const Containermain = styled.section`
  display:flex;
  flex-direction:column;
  gap: 1rem; flex='1';

`;
const Conrow = styled.section`
  display:flex;
  flex-direction:row; 
  gap: 1rem;
  width:100%;
  flex-wrap:${props => props.wrap?props.wrap:'wrap-reverse'} ;
`;
const Concol = styled.section`
  display:flex;
  flex-direction:column;
  gap:1rem;
  min-width:200px;
  flex: ${props =>  (props.flex?props.flex:1)};
`;
export const  DashboardPage = ()=>
{
//loading data
const isloadingdata = useRef(false);
 const [updatecomponent,setupdatecomponent] =  useState(false);
 const [dataincome,setdataincome] =  useState([]);
 const [dataexpense,setdataexpense] =  useState([]);
 const [ActiveForm,SetActiveForm] = useState("incomes");//this is for switch between income and expenses form
 const {getsessionuser} = useValidatelogin();
 const handleUpdatecomponent= ()=>{
  setupdatecomponent(!updatecomponent);
 } 
 //update data for edit formaseticomein
  const updatedata = async ()=>{
    const user =  getsessionuser();
    const dataincome = await Request_lastmonths(user.id,5);//get data de income  last 5 months
    const dataexpense  =  await Request_Nmonthsexpenses();
    setdataincome(dataincome);
    setdataexpense(dataexpense.data);
 }
 const handlechangemenu=(menuactive)=>{
    SetActiveForm(menuactive);
 }
 useEffect(()=>{
  //valida para que se carge una sola vez
    if (!isloadingdata.current) {
      isloadingdata.current =  true;
      return;
    }
     updatedata();
 },[updatecomponent]);

 

  return( 
   <Containermain>
    <Conrow $wrap="wrap">
      <Concol >
         <Navbar_IncomeExpenses handlechangemenu={handlechangemenu}/>
         {ActiveForm==="incomes" && <Formaddincome updatecomponent={handleUpdatecomponent}/>}
         { ActiveForm == "expenses" && <FormExpense/>}
          <Conrow>
              <IncomeMetricsLayout dataincome={dataincome} handleUpdatecomponent={handleUpdatecomponent}/> 
              <ExpensesMetricsLayout dataexpenses={dataincome} handleUpdatecomponent={handleUpdatecomponent}/>
          </Conrow>
      </Concol>
      {
        //<Concol><ListBackupDBCard/></Concol>
      } 
    </Conrow>
    
    </Containermain>
  )
}
