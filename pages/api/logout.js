import { MongoClient } from "mongodb";
import cookie from "cookie"


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
            if(user_details){
                    res.setHeader("Set-Cookie",cookie.serialize("secret","",
                    {httpOnly:true,
                      maxAge:0,
                      sameSite:"strict",
                      path:"/",
                    }))
                res.send(JSON.stringify({success:true}))  
            }
            else{
                res.send(JSON.stringify({success:false})) 
            }

             
               
            }
    
            
          
          catch(err){
              console.log(err)
            res.send(JSON.stringify({success:false})) 
          }
          
          finally {
            await client.close();
          }
    }
    

}
