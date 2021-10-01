import { MongoClient } from "mongodb";
import cookie from "cookie"


export default async function handler (req, res) {
  if(req.body.secret){
    // res.setHeader("Set-Cookie",cookie.serialize("secret","",
    // {httpOnly:true,
    //   secure:process.env.NODE_ENV!=="development", //https
    //   maxAge:0,
    //   sameSite:"strict",
    //   path:"/",
    // }))
    const uri =process.env.DB_CONN;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(process.env.DB_SELECT);
        const license_col = database.collection("license");
        const filter = { secret:req.body.secret };
        if(req.body.capi_secret){
          const updateDoc = {
            $set: {
                capi_secret:req.body.capi_secret!=="empty"?req.body.capi_secret:""
            },
          };
          await license_col.updateOne(filter, updateDoc);
         
            res.send(JSON.stringify({
                message:req.body.capi_secret,
                success:true,
            }))  
        }
        else if(req.body.random_text_gen){
          const updateDoc = {
            $set: {
              random_text_gen:req.body.random_text_gen
            },
          };
          await license_col.updateOne(filter, updateDoc);
         
            res.send(JSON.stringify({
                message:req.body.random_text_gen,
                success:true,
            }))  
        }
        else if (req.body.proxy_list){
          const updateDoc = {
            $set: {
              proxy_list:req.body.proxy_list
            },
          }; 
          await license_col.updateOne(filter, updateDoc);
          res.send(JSON.stringify({
            message:req.body.proxy_list,
            success:true,
        }))  
        }

        
      } 
      catch(err){
      }
      
      finally {
        await client.close();
      }
    }
}
