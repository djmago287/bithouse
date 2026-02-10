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

export const ExpensesMetricsLayout= ({dataexpenses,handleUpdatecomponent})=>{
    return (
        <Container>
            <CardBarchartMonth data={dataexpenses}/>
            <CardCurrentValuesMonth data={dataexpenses}/>
            <TableIncomeCard $Sflex={2} Data={dataexpenses} handleupdatepage={handleUpdatecomponent} typestyle={'secondary'} />
        </Container>
    )
}