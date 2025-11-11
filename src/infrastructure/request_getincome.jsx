export const Request_getincomeall = async ()=>{
  const URL='http://192.168.100.12:5800/api/getIncome';// this is URL from api income money
  const request =  await fetch(URL);
  const res =  await request.json();
  console.log(res);
}
export const Request_getincomecurrentmonth =  async (n_month)=>{
  const URL=`http://192.168.100.12:5800/api/getIncomecurrentMonth/${n_month}`;
  const request = await fetch(URL);
  const res =  await request.json();
  return res; 
}
export  const Request_lastmonths = async(Nmonths)=>{
   const URL=`http://192.168.100.12:5800/api/getIncomelastmonths/${Nmonths}`;
  const request =  await fetch(URL);
  const res =  await request.json();
  return res;
}    
export const Request_setincome =  async (valueincome,description,methodpayment)=>{
  const URL=`http://192.168.100.12:5800/api/postIncome`;
  const date =  new Date();
  const formatdata =  date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  const data={"value":valueincome,"description":description,"date":formatdata,"paymentmethod":methodpayment,"hour":`${date.getHours()}:${date.getMinutes()}`};
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

