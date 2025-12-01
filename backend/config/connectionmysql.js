import mysql from 'mysql';
export class dbmysql{
    constructor(){
        this.DB = mysql.createConnection(
            {
                host: 'localhost',
                user: 'djmago',
                password: 'rasta287',
                database: 'DBBITHOUSE',
            }
        );
        //validate conexion database
        this.DB.connect((err)=>{
            if(err){
                console.log({'bitehouse error': err});
                throw err
            }
            console.log("conexion exitosa");
            return this.DB
        }
        )
    }
}
