import { ExpenseAdaptermysql } from "../infrastructure/exṕenseadaptermysql.js";

export class Expenseapplication{
    static async getexpense(req,res){
        const {iduser,n_months} =  req.params;
        if(!iduser) return res.status(400).json({error:'400', msg:'No existe IdUser ingrese el parametro'});
        if(!n_months) return res.status(400).json({error:'400', msg:'No existe N_months ingrese el parametro'});
        const sql =  new ExpenseAdaptermysql();
        const result =await sql.getexpense(iduser,n_months);
        res.json(result);
    }
}