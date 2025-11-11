export const Request_getallbackupmysqlfiles  =  async ()=>{
    const url = 'http://192.168.100.12:5173/backupdb';
    const request = await fetch(url);
    const response =  await request.json();
    return response;
}