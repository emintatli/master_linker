const wp=require("./main_wp_post")
import { MongoClient } from "mongodb";
const uri =set.DB_CONN
const client = new MongoClient(uri);
import set from "../../set";

  export default async function handler (req, res) {
    try {
        await client.connect();
        const database = client.db(set.DB_SELECT);
        const license_col = database.collection("license");
        const query = { secret: req.body._secret };
        const license_valid = await license_col.findOne(query);
        
        if(license_valid && license_valid.expire>Date.now()){
            try{
               
                wp(license_valid.capi_secret,license_valid.random_text_gen,license_valid.proxy_list,req.body.do_list,license_valid.user);
                res.send(JSON.stringify({
                    message:"Process has been started.",
                    total:req.body.do_list.length,
                    proxy_count:license_valid.proxy_list.length
                }))
               }
                catch(err){
                    
                    res.send(JSON.stringify({
                        message:"Error occured.",
                        error:err
                    }))
                }
        }
    
        else{
            res.send(JSON.stringify({
                message:"Invalid or expired license.",
            }))
    
        }
      } 
      
      finally {
        await client.close();
      }





  
   

    

  }
  