import set from "../../set";
import { MongoClient } from "mongodb";
const uri =set.DB_CONN
export default async function handler (req, res) {
 
    const client = new MongoClient(uri);
  
        await client.connect();
        const database = client.db(set.DB_SELECT);
        const license_col = database.collection("license");
        const query = { secret: req.body.secret };
        const license_valid = await license_col.findOne(query);
        if(license_valid && license_valid.expire>Date.now()){
 
        const raw_data=req.body.csv;
        let min_dr=req.body.settings.min_dr!==""?parseInt(req.body.settings.min_dr):0
        let min_ur=req.body.settings.min_ur!==""?parseInt(req.body.settings.min_ur):0
        let max_external=req.body.settings.max_external!==""?parseInt(req.body.settings.max_external):10000000000000
            

        const raw_data2=min_dr>0?raw_data.filter((value)=>{return parseInt(value[2])>=min_dr}):raw_data
        const raw_data3=min_ur>0?raw_data2.filter((value)=>{return parseInt(value[3])>=min_ur}):raw_data2
        const raw_data4=max_external!==10000000000000?raw_data3.filter((value)=>{return parseInt(value[8])<max_external}):raw_data3
        const raw_data5=req.body.settings.type!==""?raw_data4.filter((value)=>{return value[13].replace(", Content","")===req.body.settings.type}):raw_data4

        function isOk(val) {
            return val !==""&&val.includes("http");
        }
      const last_data=raw_data5.map((val,index)=>index!==0&&val[5]?val[5]:"").filter(isOk)
            res.send(JSON.stringify({
                data:last_data,
                success:true,
            }))
        }
    
      
      

      
    
        
    

}
