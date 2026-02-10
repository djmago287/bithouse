import styled from "styled-components";
import { CardBarchartMonth } from "../components/BarchartMonthCard";
import { CardCurrentValuesMonth } from "../components/CurrentValueMonthCard";
import { TableIncomeCard } from "../components/TableIncomeCard";
const Container = styled.section`
  display:flex;
  flex-direction:column;
  gap:1rem;
  min-width:200px;
  flex: ${props =>  (props.flex?props.flex:1)};
`;

export const IncomeMetricsLayout = ({dataincome,handleUpdatecomponent})=>{
    return (
        <Container>
            <CardBarchartMonth data={dataincome}/>
            <CardCurrentValuesMonth data={dataincome}/>
            <TableIncomeCard $Sflex={2} Data={dataincome} handleupdatepage={handleUpdatecomponent}  />
        </Container>
    )
}