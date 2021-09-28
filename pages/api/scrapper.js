const uri ="mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net"
import { MongoClient } from "mongodb";
import ahrefs from "./ahrefs";
export default async function handler (req, res) {

    const client = new MongoClient(uri);
  
        await client.connect();
        const database = client.db("slink_api");
        const license_col = database.collection("license");
        const query = { secret: req.body.secret };
        const license_valid = await license_col.findOne(query);
        if(license_valid && license_valid.expire>Date.now()){

        //   const BASE_URL="https://app.toolsminati.com/login";
        //   const TARGET_URL="https://frontendmasters.com/";
        //   const USERNAME="user3min";
        //   const PASSWORD="satellitea10";
        //   const BASE_URL_2="https://ahr.toolsminati.com/site-explorer/backlinks/v7/external-per-domain/subdomains/live/all/all/all/1/traffic_desc?target="
        //   const DELAY=50;
        //     await ahrefs.initialize();
        //     await ahrefs.scrap_url(BASE_URL,BASE_URL_2,TARGET_URL,USERNAME,PASSWORD,DELAY);
        
        console.log(req.body.csv)


            res.send(JSON.stringify({
                message:"ok.",
                success:true,
            }))
        }
    
      
      

      
    
        
    

}
