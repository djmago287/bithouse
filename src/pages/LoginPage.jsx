import { Alert, Button, TextField } from "@mui/material";
import styled from "styled-components";
import { Request_login } from "../infrastructure/request_login";
import { useState } from "react";
import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useValidatelogin } from "../customhooks/ValidateLoginCustomhook";


const Conform = styled.form`
 background:white;
  border-radius:1rem;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  padding:0.5rem;
  gap:1rem;
`;
const Conheader = styled.section`
 background:black;
 text-align:center;
`;

export const LoginPage = ()=>{
  const navigate =  useNavigate();
  const {setsessionuser} =  useValidatelogin();
  const [error,seterror] = useState(false);
  const [user,setuser] = useState({Name:"",Password:""});
  const handleLogin =  async(e)=>{
  e.preventDefault();
  const Result =  await Request_login(user.Name,user.Password);
  if (Result.status == "OK") {
    setsessionuser("juan","1234");
    //navigate('/',{replace:true});
    window.location.href = "http://localhost:5173";
  }else{
    seterror(true);
  }
 }
  return (
    <Conform onSubmit={(e)=>handleLogin(e)}> 
     <Conheader><h2>BITHOUSE</h2></Conheader>    
      <TextField label="Usuario" variant="outlined" id="txtUser" value={user.Name} onChange={e=>setuser({...user,Name:e.target.value})}></TextField>
      <TextField label="Contraseña" variant="outlined" id="txtpasswor" type="password" value={user.Password} onChange={e=>setuser({...user,Password:e.target.value})}/>
     {error&&<Alert severity="error">La contraseña o usuario esta incorrecto.</Alert>}     
    <Button type="submit" variant="contained"> Ingresar </Button>
    
    </Conform>);
}

