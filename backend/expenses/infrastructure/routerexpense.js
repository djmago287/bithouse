import { Router} from 'express';
import { Expenseapplication } from '../application/expense.js';
export const expenseRouter =  Router();
expenseRouter.get('/getexpenses/:iduser/:n_months',Expenseapplication.getexpense);
expenseRouter.post('/postexpense/:iduser',Expenseapplication.postexpense);
expenseRouter.delete('/deleteexpense/:iduser/:idexpense',Expenseapplication.deleteexpense);
expenseRouter.put('/updateexpense/:iduser/:idexpense',Expenseapplication.updateexpense)