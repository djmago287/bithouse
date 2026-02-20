import express from 'express'
import { dbmysql } from "./config/connectionmysql.js";
import cors from  'cors';
import { expenseRouter } from './expenses/infrastructure/routerexpense.js';
import { backupdbmysqlRouter } from './backupdb/infrastructure/routerbackupmysql.js';
import { incomeRouter } from './income/infrastructure/routerincome.js';


const app =  express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT ?? 5800;
const database =  new dbmysql();
const DB  =  database.DB;
app.get('/api/getIncome',(req,res)=>{
  const SQLQUERY = 'SELECT * FROM IncomeMoney';
  DB.query(SQLQUERY,(err,result)=>{
    if(err){
      throw err;
    }
    console.log("Ok operation");
    res.json(result);
  })
});
//this is peticion is for current month  this is the year that the client want to it.
app.get('/api/getIncomeMonth/:n_month',(req,res)=>{
  //n_month ->is for number month
  //?pendiente validar por si el mes es numero o palabra
  const n_month =  req.params.n_month;
  const year = new Date().getFullYear();
  const SQLQUERY = 'SELECT * FROM IncomeMoney WHERE YEAR(DateIncomeM) = ?  AND MONTH(DateIncomeM) = ?';
  const values = [year,n_month];
  DB.query(SQLQUERY,values,(err,result)=>{
    if (err) {
      throw err
    }else{
      console.log("Ok peticion month");
      res.json(result);
    }
  })
});
// get  los datos de los meses que quiero traer pueden ser los ultimo 3 o 5 
app.get('/api/getIncomelastmonths/:iduser/:n_months',(req,res)=>{
  const {n_months,iduser} =  req.params;
  const SQLQUERY = 'SELECT * FROM IncomeMoney WHERE  IdUser = ? AND DateIncomeM >= DATE_SUB(LAST_DAY(NOW()), INTERVAL ? MONTH) ORDER BY DateIncomeM ASC ';
  const values = [iduser,n_months-1];
  DB.query(SQLQUERY,values,(err,result)=>{
    if (err) {
      throw err;
    }else{
      console.log("OK peticion de last 5 months" );
      res.json(result);
    }
  })
})
//ingresar nuevos ingresos
app.post('/api/postIncome/:iduser',(req,res)=>{
  const {iduser} = req.params
  const {value,description,date,paymentmethod,hour,typeincome} =  req.body;
  if (!value || !date || !description || !paymentmethod || !hour || !typeincome || !iduser) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  const values = [iduser,value, date, description, paymentmethod, hour,typeincome];
  const SQLQUERY = 'INSERT INTO IncomeMoney (IdUser,ValueIncomeM,DateIncomeM,DescriptionIncomeM,PaymentmethodIncomeM,HourIncomeM,TypeIncomeM) values(?,?,?,?,?,?,?);'
  
  DB.query(SQLQUERY,values,(err,result)=>{
    if (err) {
      throw err;
    }else{
      console.log("Set data ok income money. id:"+result.insertId)
    
    }
    return res.json({status:"OK",smg:"Ingreso correcto"});
  })
})
//Update data income money
app.put('/api/updateIncome/:id',(req,res)=>{
  const {id} =  req.params;
  const {value,description,date,paymentmethod,hour,typeincome} =  req.body;
  const values = [value, date, description, paymentmethod, hour,typeincome,id];
  const SQLQUERY = 'UPDATE IncomeMoney SET ValueIncomeM = ?, DateIncomeM = ?, DescriptionIncomeM = ?, PaymentmethodIncomeM = ?, HourIncomeM = ?, TypeIncomeM = ? WHERE idIncomeM = ? ';
  DB.query(SQLQUERY,values,(err,result)=>{
    if (err) {
      throw err;
      res.status(500).json({ error: 'Error al actualizar los datos.' });
    }else{
      console.log("Update data income money ok id:"+id);
      res.json({status:"OK",msg:`Update data income money ok id ${+id}.`});
    }
  })
});
//Login
 app.post('/api/postlogin',(req,res)=>{
  const {User,Password} =  req.body;
  const values =  [User,Password];
  const SQLQUERY = 'SELECT * FROM User WHERE NameUser = ?  AND  PasswordUser = ? ';
   DB.query(SQLQUERY,values,(err,result)=>{
     if (err) {
      throw err;
     }else{
       console.log("Login for user is correct");
       result.length==0?
         res.json({status:"error",msg:"no existe usuario"}):
         res.json( {status:"OK", msg:"Correct login client",data:result});
       
     }
  
   })
 })
 //this router if for income 
 app.use('/api',incomeRouter)
 app.use('/api',expenseRouter)
 //this router is for list backupbackup
 app.use('/backupdb',backupdbmysqlRouter);
//DB.end();
const server = app.listen(PORT,()=>{
  console.log("El puerto esta corriendo en el port:"+PORT)
});
