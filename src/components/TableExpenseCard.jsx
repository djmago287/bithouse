import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import EditIcon  from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { useTypestyles } from "../customhooks/StylesCustomhook";
import { UseDateformat } from "../customhooks/DateCustomhook";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";
import { Request_deleteexpense } from "../infrastructure/request_expense";
import { ToastView, useToast } from "./Toast";
import { UpdateexpenseFormModal } from "./UpdateExpenseFormModal";

const CardTable = styled.section`
  background-color:white;
  width:100%;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;



export const TableExpenseCard = ({Sflex, Data,typestyle,handleupdatepage})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const [openmodalupdateexpense,setopenmodalupdateexpense] =  useState (false);
  const [dataexpenseupdate,setdataexpenseupdate] = useState({});//the data update income 
  const {formatdate} = UseDateformat();
  const toastDeleteincome = useToast();
  const handledeleteitemIncome =async (idexpense)=>{
    const user = useValidatelogin();
    Request_deleteexpense(user.getsessionuser().id,idexpense);
    handleupdatepage();
    toastDeleteincome.inserttoast('Ingreso Eliminado correcto','success');
  }
  useEffect(()=>{
    insertstyle();
  })
  return(
    <CardTable Sflex={Sflex}>
      <TableContainer sx={{maxHeight:480,overflow:'auto'}}>
        <Table  aria-label="simple table"> 
          <TableHead sx={{ backgroundColor: style,position:"sticky",top:"0px",zIndex:3}} >
            <TableRow>
              <TableCell sx={{color:'white'}}>N°</TableCell>
              <TableCell sx={{color:'white'}}>Monto</TableCell>
              <TableCell sx={{color:'white'}}>Tipo gastos</TableCell>
              <TableCell sx={{color:'white'}}>Metodo pago  </TableCell>
              <TableCell sx={{color:'white'}}>Fecha</TableCell>
              <TableCell sx={{color:'white'}}>Descripcion</TableCell>
              <TableCell sx={{color:'white'}}>Option</TableCell>
            </TableRow>        
         </TableHead>
          <TableBody>
            {
              Data.slice().reverse().map((item,key)=>(
                <TableRow key={key} >
                  <TableCell align="right">{key}</TableCell>
                  <TableCell align="right" >{(item.ValueExpense).toFixed(2)
                  }</TableCell>
                  <TableCell align="left">{item.TypeExpense}</TableCell>
                  <TableCell align="left">{item.PaymentmethodExpense}</TableCell>
                  <TableCell align="left">{formatdate(item.DateExpense)}</TableCell>
                  <TableCell align="left" sx={{ overflow:'hidden',whiteSpace:'nowrap',maxWidth:100,textOverflow:'ellipsis'}}>{item.DescriptionExpense}</TableCell>
                  <TableCell align="left" sx={{display:'flex',flexDirection:'row'}}>
                    <IconButton aria-label="Edit" onClick={()=>{
                      setopenmodalupdateexpense(true);
                      setdataexpenseupdate(item)
                    }}> 
                      <EditIcon/> 
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={()=>handledeleteitemIncome(item.IdExpense)}>
                     <DeleteForeverIcon/> 
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ToastView toasts={toastDeleteincome.listtoasts} />
      {////the handleupdatecomponent is to update the data after close the modal 
      }
      {openmodalupdateexpense &&<UpdateexpenseFormModal handleclose={()=>setopenmodalupdateexpense(false)} dataexpense={dataexpenseupdate} handleupdatepage={handleupdatepage} />}
      
    </CardTable>
  );
}
