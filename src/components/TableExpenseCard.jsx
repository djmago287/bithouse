import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import EditIcon  from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { useTypestyles } from "../customhooks/StylesCustomhook";
import { UpdateincomeFormModal } from "../components/UpdateincomeFormModal";
import { UseDateformat } from "../customhooks/DateCustomhook";
import { Request_deleteincome } from "../infrastructure/request_getincome";
import { ToastView, useToast } from "./Toast";

const CardTable = styled.section`
  background-color:white;
  width:100%;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;



export const TableExpenseCard = ({Sflex, Data,typestyle,handleupdatepage})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const [openmodalupdateincome,setopenmodalupdateincome] =  useState (false);
  const [dataincomeupdate,setdataincomeupdate] = useState({});//the data update income 
  const {formatdate} = UseDateformat();
  const toastDeleteincome = useToast();
  const handledeleteitemIncome =async (id)=>{
    Request_deleteincome(id);
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
              <TableCell sx={{color:'white'}}>Tipo ingreso</TableCell>
              <TableCell sx={{color:'white'}}>Tipo pago </TableCell>
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
                      setopenmodalupdateincome(true);
                      setdataincomeupdate(item)
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
      {openmodalupdateincome &&<UpdateincomeFormModal handleupdatepage={handleupdatepage} handleclose={()=>setopenmodalupdateincome(false)} dataincome={dataincomeupdate}  />}
      
    </CardTable>
  );
}
