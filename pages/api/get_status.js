import { MongoClient } from "mongodb";
import set from "../../set";


export default async function handler (req, res) {
    if(req.body.secret){
        const uri =set.DB_CONN;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db(set.DB_SELECT);
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
