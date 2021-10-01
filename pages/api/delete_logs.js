import { MongoClient } from "mongodb";



export default async function handler (req, res) {
    if(req.body.secret){
        const uri =process.env.DB_CONN;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db(process.env.DB_SELECT);
            const license_col = database.collection("license");
            const filter = { secret:req.body.secret };
            const user_details = await license_col.findOne(filter);
            const user_name=user_details.user;
            const success_col = database.collection("success");
            const query = { user: user_name };
            const result1 = await success_col.deleteMany(query);
            const pending_col = database.collection("pending");
            const result2 = await pending_col.deleteMany(query);
             if(result1 && result2){
              res.send(JSON.stringify({success:true}))
             }
             else{
              res.send(JSON.stringify({success:false})) 
             }
                  
            }
    
            
          
          catch(err){
            res.send(JSON.stringify({success:false})) 
          }
          
          finally {
            await client.close();
          }
    }
    

}
