import { ExpenseEntity } from "../domain/expensesentity.js";
import { ExpenseAdaptermysql } from "../infrastructure/exṕenseadaptermysql.js";
const sql =  new ExpenseAdaptermysql();
export class Expenseapplication{
    static async getexpense(req,res){
        const {iduser,n_months} =  req.params;
        if(!iduser) return res.status(400).json({error:'400', msg:'No existe IdUser ingrese el parametro'});
        if(!n_months) return res.status(400).json({error:'400', msg:'No existe N_months ingrese el parametro'});
        const result =await sql.getexpense(iduser,n_months);
        res.json(result);
    }
    static async postexpense(req,res)
    {   
        const {iduser} = req.params
       
        const {value,description,paymentmethod,date,hour,type} = req.body;
        const expenseentity =  new ExpenseEntity(value,description,paymentmethod,hour,date,type,iduser);
        if(expenseentity.validateExpense() == false)
        return res.status(400).json({error:'Todos los campos son obligatorios.'});
        const result =  await sql.postexpense(expenseentity);
        res.json(result);
    }
    static async deleteexpense(req,res)
    {
        const {iduser,idexpense} = req.params;
        const expensesentity =  new ExpenseEntity();
        expensesentity._id = idexpense;
        expensesentity._idUser = iduser;
        if(expensesentity.validatedeleteExpense()==false)
            return res.status(400).json({error:'Todos los campos son obligatorios'});
        const result = await sql.deleteexpeense(expensesentity)
        res.json(result);
    }
    static async updateexpense(req,res)
    {
        const {iduser,idexpense} =  req.params;
        const {value,description,paymentmethod,date,hour,type} = req.body;
        const expenseentity =  new ExpenseEntity(value,description,paymentmethod,hour,date,type,iduser);
        expenseentity._id = idexpense;
        if(expenseentity.validatedeleteExpense()==false)
            return res.status(400).json({error:'Todos los campos son obligatorios'});
        const result =  await sql.updateexpense(expenseentity);
        res.json(result);
    }
}