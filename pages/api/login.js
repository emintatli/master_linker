const uri =set.DB_CONN
import { MongoClient } from "mongodb";
import cookie from "cookie"
import set from "../../set";
export default async function handler (req, res) {

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(set.DB_SELECT);
        const license_col = database.collection("license");
        const query = { secret: req.body._secret };
        const license_valid = await license_col.findOne(query);

        if(license_valid && license_valid.expire>Date.now()){
         
        res.setHeader("Set-Cookie",cookie.serialize("secret",JSON.stringify({capi:license_valid.capi_secret,secret:license_valid.secret,user:license_valid.user}),
        {httpOnly:true,
          // secure:set.NODE_ENV!=="development", //https
          maxAge:60*60,
          sameSite:"strict",
          path:"/",
        }))

            res.send(JSON.stringify({
                message:"Login successfull.",
                expire:license_valid.expire,
                user:license_valid.user,
                success:true,
            }))  
        }
    
        else{
            res.send(JSON.stringify({
                message:"Invalid or expired license.",
                success:false,
            }))
    
        }
      } 
      
      finally {
        await client.close();
      }

}
