    import { dbmysql } from "../../config/connectionmysql.js";
    export class IncomeAdaptermysql{
        constructor(){
            const database = new dbmysql();
            this.db = database.DB
        }
        async deleteincome(id){
            const SQLQUERY = 'DELETE FROM IncomeMoney WHERE  idIncomeM = ?';
            const resultpromise = new  Promise((resolve, reject)=>{
                this.db.query(SQLQUERY,id,(err,result)=>{
                    if(err){
                        throw err;
                        res.status(500).json({erro:"Error al Eliminar ingreso."})
                    }else{
                        
                        resolve({'status':'ok','Msg':'Data income delete correct id:'+id});
                    }
                })
            })
            const result = await resultpromise;
            return result;
        
        }
    }