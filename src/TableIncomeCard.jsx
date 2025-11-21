import { Alert, IconButton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import EditIcon  from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { useTypestyles } from "./customhooks/StylesCustomhookj";
import { UpdateincomeFormModal } from "./components/UpdateincomeFormModal";
import { UseDateformat } from "./customhooks/DateCustomhook";
import { Request_deleteincome } from "./infrastructure/request_getincome";

const CardTable = styled.section`
  background-color:white;
  width:100%;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;



export const TableIncomeCard = ({Sflex, Data,typestyle,handleupdatepage})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const [openmodalupdateincome,setopenmodalupdateincome] =  useState (false);
  const [dataincomeupdate,setdataincomeupdate] = useState({});//the data update income 
  const {formatdate} = UseDateformat();

   const [openSnackbar,setopenSnackbar] = useState(false);
    const handleClosetoast = (event, reason) => {
        setopenSnackbar(false);
    }
  const handledeleteitemIncome =async (id)=>{
    Request_deleteincome(id);
    handleupdatepage();
    setopenSnackbar(true);
  }
  useEffect(()=>{
    insertstyle();
  })
  return(
    <CardTable Sflex={Sflex}>
      <TableContainer sx={{maxHeight:480,overflow:'auto'}}>
        <Table  aria-label="simple table"> 
          <TableHead sx={{ backgroundColor: style}} >
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
                  <TableCell align="right" >{(item.ValueIncomeM).toFixed(2)
                  }</TableCell>
                  <TableCell align="left">{item.TypeIncomeM}</TableCell>
                  <TableCell align="left">{item.PaymentmethodIncomeM}</TableCell>
                  <TableCell align="left">{formatdate(item.DateIncomeM)}</TableCell>
                  <TableCell align="left" sx={{ overflow:'hidden',whiteSpace:'nowrap',maxWidth:100,textOverflow:'ellipsis'}}>{item.DescriptionIncomeM}</TableCell>
                  <TableCell align="left" sx={{display:'flex',flexDirection:'row'}}>
                    <IconButton aria-label="Edit" onClick={()=>{
                    setopenmodalupdateincome(true);
                    setdataincomeupdate(item)
                  }}> <EditIcon/> </IconButton>
                   <IconButton aria-label="Delete" onClick={()=>handledeleteitemIncome(item.IdIncomeM)}> <DeleteForeverIcon/> </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClosetoast}>
        <Alert severity="error" >Ingreso Eliminado correcto:</Alert>
      </Snackbar>
      {////the handleupdatecomponent is to update the data after close the modal
      }
      {openmodalupdateincome &&<UpdateincomeFormModal handleupdatepage={handleupdatepage} handleclose={()=>setopenmodalupdateincome(false)} dataincome={dataincomeupdate}  />}
      
    </CardTable>
  );
}
