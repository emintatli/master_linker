import { MongoClient } from "mongodb";



export default async function handler (req, res) {
    if(req.body.secret){
        const uri ="mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net";
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db("slink_api");
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
