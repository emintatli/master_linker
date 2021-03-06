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
            const user_name=user_details.user;
            const success_col = database.collection("success");
            const filter2 = { user:user_name };
            const user_success_data = await success_col.find(filter2).toArray().then(a=>a);
            const pending_col = database.collection("pending");
            const user_pending_data = await pending_col.find(filter2).toArray().then(a=>a);
            const user_data={
                user_success_data,
                user_pending_data
            }
             
                res.send(JSON.stringify({user_data,success:true}))  
            }
    
            
          
          catch(err){
            res.send(JSON.stringify({success:false})) 
          }
          
          finally {
            await client.close();
          }
    }
    

}
