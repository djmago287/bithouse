import mysql from 'mysql';
export class dbmysql{
    constructor(){
        const servidores = [
            {
                host:'192.168.100.12',//local
                user: 'djmago',
                password: 'rasta287',
                database: 'DBBITHOUSE',
            },
            {
                host:'192.168.192.158',//red local/remoto
                user: 'djmago',
                password: 'rasta287',
                database: 'DBBITHOUSE',
            }
        ]
        this.DB = mysql.createConnection(
            {
                host:'192.168.192.158',
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
            console.log("conexion exitosa"+this.DB.config.host);
            return this.DB
        }
        )
    }
}
