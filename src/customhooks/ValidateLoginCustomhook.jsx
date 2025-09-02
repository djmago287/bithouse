
export const useValidatelogin =()=>{
  const setsessionuser = (User, Password)=>{
    const  datauser = {'Name':User,"Password":Password};
    sessionStorage.setItem("datauser",JSON.stringify((datauser)));
  } 
  const validateuser = ()=>{
    const sessionuser =  sessionStorage.getItem("datauser");
    return sessionuser ? true :  false;
  }
  
  return{
    setsessionuser,
    validateuser
  }
}  
