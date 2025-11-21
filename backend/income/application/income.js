import { IncomeAdaptermysql } from "../infrastructure/incomeadaptermmysql.js";

export class IncomeAplication{
    static async deleteincome(req,res){
        const {id} =  req.params;
        const sql = new IncomeAdaptermysql();
        const result = await sql.deleteincome(id);
        res.json(result);
    }
}