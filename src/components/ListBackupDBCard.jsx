import styled from "styled-components";
import { Request_getallbackupmysqlfiles } from "../infrastructure/request_getbackup";
import { useEffect, useState } from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const Cardbackup = styled.section`
  background-color:white;
  border-radius:4px;
  flex:${props => props.Sflex ? props.Sflex : 1 };
`;
const Title = styled.h2`
  color:black;
  text-align:center;
`
export const ListBackupDBCard = ()=>{
  const [listfilebackupSQL,setlisrfilebackupSQL] = useState([]);
  const fetchbackupfiles = async ()=>{
    const listfiles = await Request_getallbackupmysqlfiles();
    setlisrfilebackupSQL(listfiles);
  }
  const hola = ()=>{
    console.log("nuevo muneo");
  }
  useEffect(()=>{
    fetchbackupfiles();
  },[]);
  //
    return(
        <Cardbackup>
          <Title>Backup SQL mysql</Title>
          <List dense sx={{border: '1px solid #e5e7eb',margin:'1rem'}}>
             {
                listfilebackupSQL&&listfilebackupSQL.map((item,key)=>(
                  <ListItem sx={{borderBottom:'1px solid #e5e7eb'}} key={key} secondaryAction={
                    <IconButton>
                      <DownloadForOfflineIcon/>
                    </IconButton>
                  }> 
                    <ListItemIcon>
                      <InsertDriveFileIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{color:"black"}} primary={item} ></ListItemText>
                  </ListItem>
                ))
              }
          </List>

        </Cardbackup>
    )
}