export const Request_login= async (User, Password)=>
{
 const URL = 'http://192.168.192.158:5173/api/postLogin';
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
