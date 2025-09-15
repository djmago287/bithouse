import fs from 'fs';
export class BackupMysqlAplication{
    static async readallbackupmysql(req,res){
        let listitem = [];
        fs.readdir('./src/backupdbmysql',(err,files)=>{
            if(err)
                console.log(err)
            else{listitem = files;}
            console.log(files);
            res.json(listitem);
        });
        
    }
}