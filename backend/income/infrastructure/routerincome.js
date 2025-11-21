import { Router } from "express";
import { IncomeAplication } from "../application/income.js";
export const incomeRouter = Router();
//this put is for delete income by id only one field
incomeRouter.delete('/deleteIncome/:id',IncomeAplication.deleteincome);