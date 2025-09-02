export const Request_login= async (User, Password)=>
{
 const URL = 'http://127.0.0.1:5800/api/postLogin';
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
