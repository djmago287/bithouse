export const Request_Nmonthsexpenses = async ()=>{
     const URL = import.meta.env.VITE_URL_GETEXPENSECURRENTMONTHS+"1/2";
     const request = await fetch(URL);
     const res = await request.json();//transform a json
     return res;
}
   