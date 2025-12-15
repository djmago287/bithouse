import { ExpenseAdaptermysql } from "../infrastructure/exṕenseadaptermysql.js";

export class Expenseapplication{
    static async getexpense(req,res){
        const {iduser} =  req.params;
        if(!iduser) return res.status(400).json({error:'400', msg:'No existe IdUser ingrese el parametro'})
        const sql =  new ExpenseAdaptermysql();
        const result =await sql.getexpense(iduser);
        res.json(result);
    }
}