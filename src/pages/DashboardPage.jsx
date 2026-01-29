import { useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { Formaddincome } from "../AddincomeForm";
import { CardBarchartMonthIncome } from "../BarchartMonthIncomeCard";
import { CardCurrentValuesMonth } from "../CurrentValueMonthCard";
import { TableIncomeCard } from "../TableIncomeCard";
import { Request_lastmonths } from "../infrastructure/request_getincome";
import { Navbar_IncomeExpenses } from "../components/Navbar_IncomeExpenses";
import { FormExpense } from "../components/AddexpenseForm";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";


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
 const [datacurrentmonth,setdatacurrentmonth] = useState([]);
 const [dataincome,setdataincome] =  useState([]);
 const [ActiveForm,SetActiveForm] = useState("incomes");//this is for switch between income and expenses form
 const {getsessionuser} = useValidatelogin();
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
    const user =  getsessionuser();
    const data = await Request_lastmonths(user.id,5);//get data de income  last 5 months
    getcurrentdatamonth(data);
    setdataincome(data);
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
         {ActiveForm==="incomes" && <Formaddincome updatecomponent={handleupdatecomponent}/>}
         { ActiveForm == "expenses" && <FormExpense/>}
          <Conrow>
              <Concol>
                <CardBarchartMonthIncome dataincome={dataincome} /> 
                {datacurrentmonth.length>0 ? (<CardCurrentValuesMonth datamonth={datacurrentmonth}/> ):null}
                <TableIncomeCard $Sflex={2} Data={dataincome} handleupdatepage={handleupdatecomponent} ></TableIncomeCard> 
              </Concol>
              <Concol>
                <CardBarchartMonthIncome dataincome={dataincome} typestyle={'secondary'}/> 
                {datacurrentmonth.length>0 ? (<CardCurrentValuesMonth datamonth={datacurrentmonth} typestyle={'secondary'}/> ):null}
                <TableIncomeCard $Sflex={2} Data={dataincome} typestyle={'secondary'}  ></TableIncomeCard> 
              </Concol>
            
          </Conrow>
      </Concol>
      {
        //<Concol><ListBackupDBCard/></Concol>
      } 
    </Conrow>
    
    </Containermain>
  )
}
