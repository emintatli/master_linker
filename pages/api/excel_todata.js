const uri =process.env.DB_CONN
import { MongoClient } from "mongodb";
export default async function handler (req, res) {

    const client = new MongoClient(uri);
  
        await client.connect();
        const database = client.db(process.env.DB_SELECT);
        const license_col = database.collection("license");
        const query = { secret: req.body.secret };
        const license_valid = await license_col.findOne(query);
        if(license_valid && license_valid.expire>Date.now()){

        let raw_data=req.body.csv;
        req.body.settings.min_dr&&(raw_data=raw_data.filter((value)=>{return value[2]>=req.body.settings.min_dr}))
       req.body.settings.min_ur&&(raw_data=raw_data.filter((value)=>{return value[3]>=req.body.settings.min_ur}))
       req.body.settings.max_external&&(raw_data=raw_data.filter((value)=>{return value[8]<=req.body.settings.max_external}))
       req.body.settings.type&&(raw_data=raw_data.filter((value)=>{return value[13].replace(", Content","")===req.body.settings.type}))
      const last_data=raw_data.map(val=>val[5])
            res.send(JSON.stringify({
                data:last_data,
                success:true,
            }))
        }
    
      
      

      
    
        
    

}
