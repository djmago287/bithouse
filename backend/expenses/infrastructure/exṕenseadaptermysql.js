import { dbmysql } from "../../config/connectionmysql.js";
export class ExpenseAdaptermysql{
    constructor()
    {
        const database =  new dbmysql();
        this.db =  database.DB
    }
    async getexpense(iduser,n_months){
        const SQLQUERY = 'SELECT * FROM Expense WHERE IdUser = ? AND DateExpense >= DATE_SUB(LAST_DAY(NOW()), INTERVAL ? MONTH) ORDER BY DateExpense ASC';
        const values = [iduser,n_months]
        const resultpromise = new Promise((resolve,reject)=>{
             this.db.query(SQLQUERY,values,(err,result)=>{
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
    async postexpense(dataexpense)
    {
        //1,10,'this is new','Efectivo','12:50','2021-02-03','gastos'
        const SQLQUERY = "Insert into Expense (IdUser,ValueExpense,DescriptionExpense,PaymentmethodExpense,HourExpense,DateExpense,TypeExpense) values(?,?,?,?,?,?,?)";
        const values  = [
            dataexpense._idUser,
            dataexpense._value,
            dataexpense._description,
            dataexpense._paymentmethod,
            dataexpense._hour,
            dataexpense._date,
            dataexpense._type,
        ]   
        const insertpromise =  new Promise((resolve,reject)=>{
            this.db.query(SQLQUERY,values,(err,result)=>{
                if(err)throw err;
                if(!err){
                    console.log("Ok inserted expense in the db.")
                    resolve({'status':'ok','msg':'Inserted expense correct'})
                }
            })
        })
        const res = await insertpromise;
        return res;
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