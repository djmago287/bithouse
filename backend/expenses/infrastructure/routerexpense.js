import { Router} from 'express';
import { Expenseapplication } from '../application/expense.js';
export const expenseRouter =  Router();
expenseRouter.get('/getexpenses/:iduser/:n_months',Expenseapplication.getexpense);