import styled from "styled-components";
import { CardBarchartExpenseMonth } from "../components/BarchartMonthExpenseCard";
import { CardCurrentValuesExpenseMonth } from "../components/CurrentValuesExpenseCard";
import { TableExpenseCard } from "../components/TableExpenseCard";
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
            <CardBarchartExpenseMonth data={dataexpenses} typestyle={'secondary'}/>
            <CardCurrentValuesExpenseMonth data={dataexpenses} typestyle={'secondary'} />
            <TableExpenseCard $Sflex={2} Data={dataexpenses} handleupdatepage={handleUpdatecomponent} typestyle={'secondary'}  />
            
        </Container>
    )
}