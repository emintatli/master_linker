const uri ="mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net"
import { MongoClient } from "mongodb";

export default async function handler (req, res) {

    const client = new MongoClient(uri);

        await client.connect();
        const database = client.db("slink_api");
        const license_col = database.collection("license");
        const query = { secret: req.body.secret };
        const license_valid = await license_col.findOne(query);
        if(license_valid){
            require('child_process').exec('sudo /sbin/shutdown -r now', function (msg) { console.log(msg) });
      
            res.send(JSON.stringify({
                data:last_data,
                success:true,
            }))
        }
    
      
      

      
    
        
    

}
