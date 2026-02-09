import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, createTheme, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UseDateformat } from "../customhooks/DateCustomhook";
import { Request_updateincome } from "../infrastructure/request_getincome";

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
const ConformUpdateincome = styled.form`
    display:flex;
    flex-direction:column;
    gap:1rem;
`;
const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})
export const UpdateincomeFormModal = ({handleclose,dataincome,handleupdatepage}) => {
    const {formatdate} = UseDateformat();
    const [validateupdateincome,setvalidateupdateincome] = useState(true);
    const [openSnackbar,setopenSnackbar] = useState(false);
   
    //the error this component is going to receive is the income data to update
    const [updatedataincome, setupdatedataincome] =  useState({
        IdIncomeM:{
            value:dataincome.IdIncomeM,
        },
        ValueIncome:{
            value:dataincome.ValueIncomeM,
            error:false
        },
        DescriptionIncomeM:{
            value:dataincome.DescriptionIncomeM,
            error:false
        },
        TypeIncomeM:{
            value:dataincome.TypeIncomeM,
            error:false
        },
        DateIncomeM:{
            value:dataincome.DateIncomeM,
            error:false
        },
        HourIncomeM:{
            value:dataincome.HourIncomeM,
            error:false
        },
        PaymentmethodIncomeM:{
            value:dataincome.PaymentmethodIncomeM,
            error:false
        },
    })
    const handlevalidateupdateincome = ()=>{
        if (updatedataincome.ValueIncome.error ||
            updatedataincome.DescriptionIncomeM.error || 
            updatedataincome.TypeIncomeM.error ||
            updatedataincome.DateIncomeM.error ||
            updatedataincome.PaymentmethodIncomeM.error
        ) {
            setvalidateupdateincome(false);
        }else{
            setvalidateupdateincome(true);
        }
    }
    const handleupdateincome = async()=>{
        if(!validateupdateincome) return;
        //call to the api to update income
        await Request_updateincome(
            updatedataincome.IdIncomeM.value,
            updatedataincome.ValueIncome.value,
            updatedataincome.HourIncomeM.value,
            updatedataincome.DescriptionIncomeM.value,
            updatedataincome.PaymentmethodIncomeM.value,
            updatedataincome.TypeIncomeM.value,
            formatdate(updatedataincome.DateIncomeM.value)
        );
        setopenSnackbar(true);
        handleupdatepage();//this is to function update the data in the table after update
      
    }
    useEffect(()=>{
        handlevalidateupdateincome();
    })
   
  return (
    <ThemeProvider theme={darkTheme}>    
        <ModalContent onClick={handleclose}>
            {/*stopPropagation means that only the click on the button works, not the entire modal. */} 
            <Modal onClick={(e)=>e.stopPropagation()}>
                <IconButton sx={{color:"white",position:"absolute",right:0,top:0}} onClick={handleclose} color="secondary">
                    <CloseIcon sx={{color:"white"}}/>
                </IconButton>
                <Typography variant="h6" color="white" mb={2}>
                    Update Income
                </Typography>
                <ConformUpdateincome onSubmit={(e)=>e.preventDefault()}>
                    <TextField
                    required
                    error = {updatedataincome.ValueIncome.error}
                    label="Actualizar Ingreso" variant="outlined" 
                    type="number" 
                    value={updatedataincome.ValueIncome.value}
                    onChange={(e)=>
                            {
                                //validate if numbre of string
                            /^\d+$/.test(e.target.value) ? 
                            setupdatedataincome({...updatedataincome,ValueIncome:{value:e.target.value, error:false} }):
                            setupdatedataincome({...updatedataincome,ValueIncome:{value:e.target.value, error:true} });
                            }
                       }
                    fullWidth
                    />   
                    <TextField
                    error={updatedataincome.DescriptionIncomeM.error}
                    label="Actualizar Descripcion"
                    variant="outlined"
                    fullWidth
                    value={updatedataincome.DescriptionIncomeM.value}
                    onChange={(e)=>{
                        //validate if is not empty
                        e.target.value && e.target.value!=''?
                        setupdatedataincome({...updatedataincome,DescriptionIncomeM:{value:e.target.value, error:false} }):
                        setupdatedataincome({...updatedataincome,DescriptionIncomeM:{value:e.target.value, error:true} });
                    }}
                    required
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="updateincometype">Actualizar Tipo Ingreso</InputLabel>
                        <Select 
                        labelId="updateincometype" 
                        value={updatedataincome.TypeIncomeM.value}
                        label="Actualizar Tipo Ingreso"
                        onChange={e=>setupdatedataincome({...updatedataincome,TypeIncomeM:{value:e.target.value,error:false}})}
                        >
                            <MenuItem value="CobroDeuda">Cobro Deuda</MenuItem>
                            <MenuItem value="Rentas">Rentas</MenuItem>
                            <MenuItem value="Salario">Salario</MenuItem>
                            <MenuItem value="Otros">Otros</MenuItem>
                        </Select> 
                    </FormControl>
                    <Typography variant="label">{`Fecha: ${formatdate(updatedataincome.DateIncomeM.value) }`}</Typography>
                    <FormControl fullWidth required>
                        <InputLabel  id="updatemethodpayment">Actualizar Metodo Pago</InputLabel>
                        <Select 
                        labelId="updatemethodpayment" 
                        label="Actulizar Tipo ingreso"
                        value={updatedataincome.PaymentmethodIncomeM.value}
                        onChange={e=>setupdatedataincome({...updatedataincome,PaymentmethodIncomeM:{value:e.target.value,error:false}})}>
                            <MenuItem value="Efectivo" >Efectivo</MenuItem>
                            <MenuItem value="Transferencia" >Transferencia</MenuItem>
                            <MenuItem value="Otros" >Otros</MenuItem>
                        </Select> 
                    </FormControl>
                    <Button 
                    variant="contained" 
                    color={validateupdateincome?"primary":"error"} 
                    onClick={handleupdateincome}
                    fullWidth >
                        {validateupdateincome?"Actualizar Ingreso":"Datos Invalidos"}
                    </Button>
                </ConformUpdateincome>
            </Modal>
        </ModalContent>
        {
           // openSnackbar&&<ToastCustom msg={'Datos de ingreso actualizado'} typealert={'success'}/>
        }
     </ThemeProvider>
  )
}