import { Button, createTheme, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import { UseDateformat } from "../customhooks/DateCustomhook";
import { useState } from "react";
import { ToastView, useToast } from "./Toast";
import { Request_updateexpense } from "../infrastructure/request_expense";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";
const ModalContent = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(90, 88, 88, 0.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1000;
`;
const Modal = styled.div`
 position:relative;
  background-color:rgba(36, 35, 35, 1);
  padding:1rem;
  border-radius:4px;
  min-Width:400px;
  width:50%;
`;
const  ConformUpdateexpense= styled.form`
    display:flex;
    flex-direction:column;
    gap:1rem;
`;
const darkTheme =  createTheme({
    palette: {
        mode: 'dark'
    }
})

export const UpdateexpenseFormModal =({handleclose,dataexpense,handleupdatepage})=>{
const {formatdate} = UseDateformat();
const [validateupdateexpense, setvalidateupdateexpense]  = useState(true);
const toast =  useToast();
const [updateexpense,setupdateexpense] = useState({
    IdExpense:{
        value:dataexpense.IdExpense
    },
    ValueExpense:{
        value:dataexpense.ValueExpense,
        error:false
    },
    DescriptionExpense:{
        value:dataexpense.DescriptionExpense,
        error:false
    },
    PaymentMethodExpense:{
        value:dataexpense.PaymentmethodExpense,
        error:false
    },
    DateExpense:{
        value:dataexpense.DateExpense,
        error:false
    },
    HourExpense:{
        value:dataexpense.HourExpense,
        error:false
    },
    TypeExpense:{
        value:dataexpense.TypeExpense,
        error:false
    }
})
const  Handlevalidateexpense = ()=>{
    if (updateexpense.ValueExpense.error ||
            updateexpense.DescriptionExpense.error || 
            updateexpense.TypeExpense.error ||
            updateexpense.DateExpense.error ||
            updateexpense.PaymentMethodExpense.error
        ) {
            toast.inserttoast('Error:Llene todos los parametros','error');
            return false;

        }else{
            return true;
        }
}
const Handleupdateexpense =  async()=>{
    if(!Handlevalidateexpense())return;
    const user = useValidatelogin();
    //call to the api to update expense
    await Request_updateexpense(
        user.getsessionuser().id,
        updateexpense.IdExpense.value,
        updateexpense.ValueExpense.value,
        updateexpense.DescriptionExpense.value,
        updateexpense.PaymentMethodExpense.value,
        updateexpense.HourExpense.value,
        formatdate(updateexpense.DateExpense.value),
        updateexpense.TypeExpense.value)
    toast.inserttoast('Actualizacion correcto','success')
    handleupdatepage();
}   
//console.log(dataexpense)
    return(
        <ThemeProvider theme={darkTheme}>
            <ModalContent onClick={handleclose}>
                {/*stopPropagation means that only the click on the button works, not the entire modal. */} 
                <Modal onClick={(e)=>e.stopPropagation()}>
                    <IconButton
                    sx={{color:"white",position:"absolute",right:0,top:0}} 
                    onClick={handleclose}
                    color="secondary">
                         <CloseIcon sx={{color:"white"}}/>
                    </IconButton>
                    <Typography variant="h6" color="white" mb={2}>
                        Update Income
                    </Typography>
                    <ConformUpdateexpense onSubmit={(e)=>e.preventDefault()}>
                        <TextField 
                            required 
                            error = {updateexpense.ValueExpense.error}
                            label="Actualiza Gasto"
                            type="number"
                            value={updateexpense.ValueExpense.value}
                            onChange={(e)=>{
                                //validate if numbre of string
                                /^\d+$/.test(e.target.value) ? 
                                setupdateexpense({...updateexpense,ValueExpense:{value:e.target.value,error:false}}):
                                setupdateexpense({...updateexpense,ValueExpense:{value:e.target.value,error:true}});
                            }}
                        />
                        <TextField required
                            error = {updateexpense.DescriptionExpense.error}
                            label= "Actualiza Descripción"
                            value={updateexpense.DescriptionExpense.value}
                             onChange={(e)=>{
                                //validate if numbre of string
                                e.target.value && e.target.value !='' ? 
                                setupdateexpense({...updateexpense,DescriptionExpense:{value:e.target.value,error:false}}):
                                setupdateexpense({...updateexpense,DescriptionExpense:{value:e.target.value,error:true}});
                            }}
                        />
                        <FormControl required>
                            <InputLabel id="updateexpensetype">
                                Actualizar tipo gasto
                            </InputLabel>
                            <Select
                            labelId="updateincometype" 
                            label="Actualizar Tipo gasto"
                            value={updateexpense.TypeExpense.value}
                            onChange={e=>setupdateexpense({...updateexpense,TypeExpense:{value:e.target.value,error:false}})}
                      
                            >
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Transport">Transporte</MenuItem>
                            </Select>
                        </FormControl>
                         <Typography variant="label">
                            {`Fecha: ${formatdate(updateexpense.DateExpense.value) }`}
                        </Typography>
                        <FormControl fullWidth required>
                            <InputLabel  id="updatemethodpayment">Actualizar Metodo Pago</InputLabel>
                            <Select 
                            labelId="updatemethodpayment" 
                            label="Actualiza metodo pago"
                            value={updateexpense.PaymentMethodExpense.value}
                            onChange={e=>setupdateexpense({...updateexpense,PaymentMethodExpense:{value:e.target.value,error:false}})}
                            >
                                <MenuItem value="Efectivo" >Efectivo</MenuItem>
                                <MenuItem value="Transferencia" >Transferencia</MenuItem>
                                <MenuItem value="Otros" >Otros</MenuItem>
                            </Select> 
                        </FormControl>
                         <Button
                            type="submit"
                            variant="contained"
                            color={validateupdateexpense?"primary":"error"} 
                            onClick={()=>Handleupdateexpense()}
                        >
                            {validateupdateexpense?"Actualizar Ingreso":"Datos Invalidos"}
                        </Button>
                    </ConformUpdateexpense>
                </Modal>
                <ToastView toasts={toast.listtoasts} />
            </ModalContent>
        </ThemeProvider>
    )
}