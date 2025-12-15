import { Router} from 'express';
import { Expenseapplication } from '../application/accountfoypay.js';
export const accountforpayRouter =  Router();
accountforpayRouter.get('/getexpenses/:iduser',Expenseapplication.getexpense);