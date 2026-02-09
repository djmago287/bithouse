export const Request_getincomeall = async ()=>{
  const URL=import.meta.env.VITE_URL_GETINCOMEALL;// this is URL from api income money
  const request =  await fetch(URL);
  const res =  await request.json();

}
export const Request_getincomecurrentmonth =  async (idUser,n_month)=>{
  const URL=import.meta.env.VITE_URL_GETINCOMECURRENTMONTH+idUser+"/"+n_month;
  const request = await fetch(URL);
  const res =  await request.json();
  console.log(res);
  return res; 
}
export  const Request_lastmonths = async(idUser,totalmonth)=>{
   const URL= import.meta.env.VITE_URL_GETLASTMONTHS+idUser+"/"+totalmonth;
  const request =  await fetch(URL);
  const res =  await request.json();
  return res;
}    
export const Request_setincome =  async (idUser,valueincome,description,methodpayment,typeincome,date,hour)=>{
  const URL=import.meta.env.VITE_URL_POSTINCOME+idUser;
  const data={"value":valueincome,
    "description":description,
    "date":date,
    "paymentmethod":methodpayment,
    "hour":hour,
    "typeincome":typeincome
  };
  const options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }
  const request =  await fetch(URL,options);
  const res = await request.json();
  
  return res;
}
export const Request_updateincome = async(id,valueincome,hourvalueincome,description,methodpayment,typeincome,dateincome)=>{
  const URL=import.meta.env.VITE_URL_UPDATEINCOME+id;
  const data={"value":valueincome,
    "description":description,
    "date":dateincome,
    "paymentmethod":methodpayment,
    "hour":hourvalueincome,
    "typeincome":typeincome
  };
  const options = {
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }
  const request = await fetch(URL,options);
  const res = await request.json();
  console.log(res);
}
export const Request_deleteincome =  async(id)=>{
  const URL = import.meta.env.VITE_URL_DELETEINCOME+id;
  const option = {
    method:"DELETE",
    headers:{
      "Content-Type":"applicatiion/json"
    }
  }
  const request =  await fetch(URL,option)
  const res =  await request.json();
  console.log(res);
}
