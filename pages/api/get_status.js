import { MongoClient } from "mongodb";



export default async function handler (req, res) {
    if(req.body.secret){
      const uri ="mongodb://megamen:5yw4ggw5yrfeAA173f*-63d@127.0.0.1:27017";
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db("slink_api");
            const license_col = database.collection("license");
            const filter = { secret:req.body.secret };
            const user_details = await license_col.findOne(filter);
            
              
             
                res.send(JSON.stringify({status:user_details.status,success:true}))  
            }
    
            
          
          catch(err){
            res.send(JSON.stringify({success:false})) 
          }
          
          finally {
            await client.close();
          }
    }
    

}
