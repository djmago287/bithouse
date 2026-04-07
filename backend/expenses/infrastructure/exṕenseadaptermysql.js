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
                    resolve({'status':'OK','msg':'Inserted expense correct'})
                }
            })
        })
        const res = await insertpromise;
        return res;
    }
    async deleteexpeense(dataexpense)
    {
        //idexpense iduser
        const values = [
            dataexpense._id,
            dataexpense._idUser
        ]
        const SQLQUERY = "DELETE FROM Expense WHERE IdExpense = ? AND IdUser = ?";
        const deletepromise =  new Promise((resolve,reject)=>{
            this.db.query(SQLQUERY,values,(err,result)=>{
                if(err) throw err;
                if(!err ){
                    if(result.affectedRows==0)resolve ({'status':'error','msg':'This data is not delete '}) 
                    if (result.affectedRows>0) {
                         console.log(`Ok delete IdExpense ${dataexpense._id} IdUser ${dataexpense._idUser}`);
                            resolve({'status':'OK','msg':`Delete correct Expense ${dataexpense._id}`})
                    }
                   
                }
            })
        })
        const res =  await deletepromise; //the promise isn´t () because the promise
        return res
        
    }
    async updateexpense(dataexpense)
    {
       
        const values = [
            dataexpense._value,
            dataexpense._description,
            dataexpense._paymentmethod,
            dataexpense._hour,
            dataexpense._date,
            dataexpense._type,
            dataexpense._id,
            dataexpense._idUser,
        ];
        const SQLQUERY = "UPDATE Expense SET  ValueExpense = ?,DescriptionExpense = ?, PaymentmethodExpense=?, HourExpense =?, DateExpense = ?,TypeExpense= ?  where IdExpense= ? AND IdUser = ?;";

        const updatepromise = new Promise((resolve,reject)=>{
            this.db.query(SQLQUERY,values,(err,result)=>{
                if(err) throw err;
                if(!err){
                    if(result.affectedRows == 0) resolve ({'status':'error','msg':'this data is update'});
                    if(result.affectedRows ==1) {
                        console.log(`Ok update IdExpense ${dataexpense._id} iduse: ${dataexpense._idUser}`);
                        resolve({'status':'OK','mshg':`Update Expense correct ${dataexpense._id}`})
                    }
                }
            })
        })
        const res =  await updatepromise; //the promise isn´t () because it is promise
        return res

    }
}
