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
            
              
             
                res.send(JSON.stringify({...user_details,success:true}))  
            }
    
            
          
          catch(err){
            res.send(JSON.stringify({success:false})) 
          }
          
          finally {
            await client.close();
          }
    }
    

}
