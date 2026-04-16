export const Request_Nmonthsexpenses = async ()=>{
     //realizar modificacion
     const URL = import.meta.env.VITE_URL_GETEXPENSECURRENTMONTHS+"1/2";
     const request = await fetch(URL);
     const res = await request.json();//transform a json
     return res;
}
export const Request_setexpense =  async (idUser,value,description,paymentmethod,date,hour,type )=>{
     const URL = import.meta.env.VITE_URL_POSTEXPENSE+idUser;
    
     const data = {
            "value":value,
  "description":description,
  "paymentmethod":paymentmethod,
  "date":date,
  "hour":hour,
  "type":type
     }

     const options = {
          method:"POST",
          headers:{
               "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
     }
     const request = await fetch(URL,options);
     const res =  await request.json();
     return res;
}
export const Request_deleteexpense = async (idUser,idexpense) =>{
     const URL =  import.meta.env.VITE_URL_DELETEEXPENSE+idUser +"/"+ idexpense;
     const option = {
          method:"DELETE",
          headers:{
               "Content-Type":"application/json"
          }
     }
     const request =  await fetch(URL,option);
   
     const res =  await request.json();
     console.log(res)
}
export const Request_updateexpense =  async(idUser,idexpense,value,description,paymentmethod,hour,date,type) =>{
   
     const URL=  import.meta.env.VITE_URL_UPDATEEXPENSE+idUser +"/"+ idexpense;
     const data = {
          "value":value,
          "description":description,
          "paymentmethod":paymentmethod,
          "date":date,
          "hour":hour,
          "type":type
     }
     const option = {
          method : "PUT",
          headers:{
               "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
     }
     const request =  await fetch(URL,option);
     const res  =  await request.json();
     console.log(res)
     //return res;
}