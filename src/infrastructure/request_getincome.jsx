export const Request_getincomeall = async ()=>{
  const URL=import.meta.env.VITE_URL_GETINCOMEALL;// this is URL from api income money
  const request =  await fetch(URL);
  const res =  await request.json();

}
export const Request_getincomecurrentmonth =  async (n_month)=>{
  const URL=import.meta.env.VITE_URL_GETINCOMECURRENTMONTH+n_month;
  const request = await fetch(URL);
  const res =  await request.json();
  console.log(res);
  return res; 
}
export  const Request_lastmonths = async(totalmonth)=>{
   const URL= import.meta.env.VITE_URL_GETLASTMONTHS+totalmonth;
  const request =  await fetch(URL);
  const res =  await request.json();
  return res;
}    
export const Request_setincome =  async (valueincome,description,methodpayment,typeincome)=>{
  const URL=import.meta.env.VITE_URL_POSTINCOME;
  const date =  new Date();
  const formatdata =  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  const data={"value":valueincome,
    "description":description,
    "date":formatdata,
    "paymentmethod":methodpayment,
    "hour":`${date.getHours()}:${date.getMinutes()}`,
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
  console.log(res);
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
