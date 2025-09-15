import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import EditIcon  from "@mui/icons-material/Edit";
const CardTable = styled.section`
  background-color:white;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;


export const TableIncomeCard = ({Sflex, Data})=>{
  const Formatdate=(date) =>{
    //formating date in the format 0000-00-00
    const tmpdate =  new Date(date);
    const formatdate = tmpdate.getFullYear()+"-"+(tmpdate.getMonth()+1)+"-"+tmpdate.getDate();
    return formatdate;
  }

  return(
    <CardTable Sflex={Sflex}>
      <TableContainer sx={{maxHeight:150}}>
        <Table sx={{ minWidth: 220 }} aria-label="simple table"> 
          <TableHead sx={{ backgroundColor: '#1976d2'}} >
            <TableCell sx={{color:'white'}}>N°</TableCell>
            <TableCell sx={{color:'white'}} >Monto</TableCell>
            <TableCell sx={{color:'white'}}>Tipo pago </TableCell>
            <TableCell sx={{color:'white'}}>Fecha</TableCell>
            <TableCell sx={{color:'white'}}>Descripcion</TableCell>
            <TableCell sx={{color:'white'}}>Option</TableCell>
         </TableHead>
          <TableBody>
            {
              Data.slice().reverse().map((item,key)=>(
                <TableRow key={key} >
                  <TableCell align="right">{key}</TableCell>
                  <TableCell align="right" >{(item.ValueIncomeM).toFixed(2)
                  }</TableCell>
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
