import {Router} from 'express';
import { BackupMysqlAplication } from '../application/backupmysql.js';
export const backupdbmysqlRouter =  Router();
backupdbmysqlRouter.get('/',BackupMysqlAplication.readallbackupmysql)