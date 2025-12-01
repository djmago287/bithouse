
export const useValidatelogin =()=>{
  const setsessionuser = (id,User, Password)=>{
    const  datauser = {'id':id,'Name':User,"Password":Password};
    sessionStorage.setItem("datauser",JSON.stringify((datauser)));
  } 
  const validateuser = ()=>{
    const sessionuser =  sessionStorage.getItem("datauser");
    return sessionuser ? true :  false;
  }
  const getsessionuser = ()=>{
    const sessionuser =  sessionStorage.getItem("datauser");
    return JSON.parse(sessionuser);
  }
  return{
    setsessionuser,
    validateuser,
    getsessionuser
  }
}  
