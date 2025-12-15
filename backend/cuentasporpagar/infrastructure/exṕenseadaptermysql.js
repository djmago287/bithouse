import { dbmysql } from "../../config/connectionmysql.js";
export class ExpenseAdaptermysql{
    constructor()
    {
        const database =  new dbmysql();
        this.db =  database.DB
    }
    async getexpense(iduser){
        const SQLQUERY = 'SELECT * FROM Expense WHERE IdUser = ? ';
        const resultpromise = new Promise((resolve,reject)=>{
             this.db.query(SQLQUERY,iduser,(err,result)=>{
                if(err)throw err;
                if(!err){
                    console.log("OK peticion de last 5 months expense");
                    resolve({'status':'ok','data':result});
                }
             })
        }) 
        const res =  await resultpromise;
        return res;
    }
    async postexpense(iduser,dataexpense)
    {
        const SQLQUERY = "Insert into Expense (IdUser,ValueExpense,DescriptionExpense,PaymentmethodExpense,HourExpense,DateExpense,TypeExpense) values(1,10,'this is new','Efectivo','12:50','2021-02-03','gastos')"
    }
    async deleteexpeense(iduser,idexpense)
    {
        const SQLQUERY = "UPDATE Expense SET  ValueExpense = 30,DescriptionExpense = 'this is new', PaymentmethodExpense='card', HourExpense ='02:10', DateExpense = '2015-10-10',TypeExpense='new' where IdExpense=2 AND IdUser = 1;";
    }
    async updateexpense(IdUser)
    {
        const SQLQUERY = ""
    }
}