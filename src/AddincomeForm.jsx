import {  Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import {  useState } from "react";         
import { Request_setincome } from "./infrastructure/request_getincome";
import styled from "styled-components";
import { UseDatecurrent } from "./customhooks/DateCustomhook";
import { useValidatelogin } from "./customhooks/ValidateLoginCustomhook";
import { ToastView, useToast} from "./components/Toast";

//insert form the income for the client
const Conform = styled.form`
  background-color:white;
  border-radius:4px;
  display:flex;
  gap:1rem;
  padding:1rem;
  flex-wrap:wrap; 
`;
const Lbldate =  styled.label`
 color:black;
 display:flex;
 justify-content:center;
 align-items:center;
 min-Width:200px;
 flex:1
`;


export const Formaddincome = ({updatecomponent})=>{
  const {currentdate} =UseDatecurrent();
  const {getsessionuser} = useValidatelogin();
  const toast = useToast();//es un totas que me muestra uno ensima del otro
  //income is ingresos in spanish
  const [dataincome,setdataincome] = useState({
    IncomeM:{
      value:'',
      error:false
    },
    DescriptionIncomeM:{ 
      value:'',
      error:false
    },
    PaymentmethodIncomeM:{ 
      value:'Efectivo',
      error:false
    },
    TypeIncomeM:{ 
      value:'Otros',
      error:false
    },
    DateIncomeM:{ 
      value:currentdate.Year+"-"+currentdate.Month+"-"+currentdate.Day,
      error:false
    },
    HourIncomeM:{ 
      value:currentdate.Hour+":"+currentdate.Minute,
      error:false
    }
  })
  
  const prevent = (e)=>{
    e.preventDefault();
  }
  
  const handlevalidateformincome = ()=>{
 
  if (dataincome.IncomeM.error ||
        dataincome.DescriptionIncomeM.error ||
        dataincome.PaymentmethodIncomeM.error ||
        dataincome.TypeIncomeM.error ||
        dataincome.DateIncomeM.error ||
        dataincome.HourIncomeM.error ||
        dataincome.IncomeM.value =="" ||
        dataincome.DescriptionIncomeM.value=="" 
      ) {
        toast.inserttoast('Error:Llene todos los parametros','error');
         //toasterror.setstatustoast(true);
        return false;
      }else{
        return true;
      }
  }
  const handlesetincome = async ()=>{
  
    const validate = handlevalidateformincome();
    if(!validate) return;
    //console.log(income +"--"+description+"---"+methodpayment);
    const user =  getsessionuser()
    const res =await Request_setincome(
        user.id,
        dataincome.IncomeM.value,
        dataincome.DescriptionIncomeM.value,
        dataincome.PaymentmethodIncomeM.value,
        dataincome.TypeIncomeM.value,
        dataincome.DateIncomeM.value,
        dataincome.HourIncomeM.value
    );
    const id= Date.now();
    if(res.status=='OK') toast.inserttoast(`Nuevo ingreso :${dataincome.IncomeM.value}$`,'success');
    updatecomponent();
  }

  return (
    <Conform onSubmit={prevent}>
      <TextField
      required
      error={dataincome.IncomeM.error}
      sx={{flex:1,minWidth:290}}
      label={dataincome.IncomeM.error?'Solo numeros':"incomemoney"}  
      variant="outlined" 
      value={dataincome.IncomeM.value} 
      onChange={(e)=>{
        //validate if number of string
        /^\d+$/.test(e.target.value)?
        setdataincome({...dataincome,IncomeM:{value:e.target.value, error:false}}):
        setdataincome({...dataincome,IncomeM:{value:e.target.value, error:true}})
      }} />
      <TextField
      error={dataincome.DescriptionIncomeM.error}
      sx={{flex:1,minWidth:290}}
      label="Descripción" 
      variant="outlined" 
      value={dataincome.DescriptionIncomeM.value} 
      onChange={(e)=>{
        //validate if is not empty
        e.target.value && e.target.value !=''?
        setdataincome({...dataincome,DescriptionIncomeM:{value:e.target.value,error:false}}):
        setdataincome({...dataincome,DescriptionIncomeM:{value:e.target.value,error:true}})
      }} />
      <FormControl  sx={{flex:1, minWidth:200 }}  color="secondary">
        <InputLabel  id="incometype">Income Type</InputLabel>
        <Select 
        labelId="incometype" 
        label="Income Type"
        value={dataincome.TypeIncomeM.value}
        onChange={e=>setdataincome({...dataincome,TypeIncomeM:{...dataincome.TypeIncomeM,value:e.target.value}})}
        
        color="secondary">
          <MenuItem value="CobroDeuda">Cobro Deuda</MenuItem>
          <MenuItem value="Rentas">Rentas</MenuItem>
          <MenuItem value="Salario">Salario</MenuItem>
          <MenuItem value="Otros">Otros</MenuItem>
        </Select> 
      </FormControl>
      <Lbldate>{`${currentdate.Year}- ${currentdate.Month} - ${currentdate.Day} `}</Lbldate>
      <FormControl sx={{flex:1,minWidth:200}}color="secondary">
        <InputLabel id="methodpayment" >Methodpayment</InputLabel>
        <Select
        color="secondary"
          label="Methodpayment"
          value={dataincome.PaymentmethodIncomeM.value}
          onChange={e=>setdataincome({...dataincome,PaymentmethodIncomeM:{...dataincome.PaymentmethodIncomeM,value:e.target.value}})}
          >
          <MenuItem value="Efectivo" >Efectivo</MenuItem>
          <MenuItem value="Transferencia" >Transferencia</MenuItem>
          <MenuItem value="Otros" >Otros</MenuItem>
        </Select>
      </FormControl>
      <Button
      sx={{flex:1,minWidth:150}}
      type="submit" 
      variant="contained" 
      onClick={()=>{ handlesetincome()  }}>Ingresar</Button>
      {(<ToastView toasts={toast.listtoasts}/>)}
      
        </Conform>);
  
}


