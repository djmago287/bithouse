export const Request_login= async (User, Password)=>
{
 const URL = import.meta.env.VITE_URL_LOGIN;
 const data={
   "User":User,
   "Password":Password,
 };
  const options = {
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify(data),
 }
  const request =  await fetch(URL,options);
  const res = await request.json();
  return res;
}
