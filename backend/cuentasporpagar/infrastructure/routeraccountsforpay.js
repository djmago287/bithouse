import { Router} from 'express';
import { AccountforpayAplication } from '../application/accountfoypay.js';
export const accountforpayRouter =  Router();
accountforpayRouter.get('/',AccountforpayAplication.getall);