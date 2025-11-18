import { Button, ButtonGroup } from "@mui/material"
import { useState } from "react";

//the menu for optiion buton de income or expenses ingresos o gastos
export const Navbar_IncomeExpenses = ({handlechangemenu})=>{
    const [ButtonActive, setButtonActive] = useState("incomes");
    return(
        <ButtonGroup color="secondary"  variant="contained" arial-label="Basic button group">
            <Button 
            variant={ButtonActive === "incomes" ? "contained" : "outlined"}
            onClick={()=>{
                setButtonActive("incomes");
                handlechangemenu("incomes")
            } }
            >Ingresos</Button>
            <Button 
            onClick={()=>{
                setButtonActive("expenses")
                handlechangemenu("expenses")
            }}
            variant={ButtonActive === "expenses" ? "contained" : "outlined"}
            >Gastos</Button>
        </ButtonGroup>
    )
}