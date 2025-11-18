import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import EditIcon  from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useTypestyles } from "./customhooks/StylesCustomhookj";
import { Tab } from "bootstrap";
const CardTable = styled.section`
  background-color:white;
  width:100%;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;


export const TableIncomeCard = ({Sflex, Data,typestyle})=>{
  const {style,insertstyle} =  useTypestyles({type:typestyle});
  const Formatdate=(date) =>{
    //formating date in the format 0000-00-00
    const tmpdate =  new Date(date);
    const formatdate = tmpdate.getFullYear()+"-"+(tmpdate.getMonth()+1)+"-"+tmpdate.getDate();
    return formatdate;
  }
  useEffect(()=>{
    insertstyle();
  },style)
  return(
    <CardTable Sflex={Sflex}>
      <TableContainer>
        <Table sx={{ minWidth: 220 }} aria-label="simple table"> 
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
                  <TableCell align="right">{item.TypeIncomeM}</TableCell>
                  <TableCell align="right">{item.PaymentmethodIncomeM}</TableCell>
                  <TableCell align="right">{Formatdate(item.DateIncomeM)}</TableCell>
                  <TableCell align="right">{item.DescriptionIncomeM}</TableCell>
                  <TableCell align="right"><IconButton aria-label="delete"> <EditIcon/> </IconButton></TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </CardTable>
  );
}
