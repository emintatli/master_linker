const wp_post = require("./wordpress_post");
const txtgen = require('txtgen');
const random_name = require('random-name')
const randomEmail = require('random-email');
import { MongoClient } from "mongodb";
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const main_wp_post=async(captcha_TOKEN,random_text_gen,proxy_list,do_list,user)=>{
 const uri ="mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net"
 const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("slink_api");
    const slink_license = database.collection("license");
    const slink_success = database.collection("success");
    const slink_pending = database.collection("pending");
    const filter = { user: user };
    const options = { upsert: true };

    for (let i=0;i<=(do_list.length-1);i++){
      const updateDoc = {
        $set: {
          status:`${i+1}/${do_list.length}` 
        },
      };
      const updated_status=await slink_license.updateOne(filter, updateDoc, options);
      console.log(updated_status)
        let selected_proxy=proxy_list[Math.floor(Math.random() * proxy_list.length)];
        await wp_post.initialize(selected_proxy,captcha_TOKEN);
       const result_a0= await wp_post.comment(do_list[i].BASE_URL,!random_text_gen.COMMENT_TEXT?do_list[i].COMMENT_TEXT:txtgen.sentence(),
        !random_text_gen.AUTHOR?do_list[i].AUTHOR:random_name(),!random_text_gen.USER_EMAIL?do_list[i].USER_EMAIL:randomEmail(),
        do_list[i].USER_URL,!random_text_gen.DELAY?do_list[i].DELAY:randomIntFromInterval(0, 50));
        
        const _data = {user:user,url:result_a0.url,time:Date.now() }
        if(result_a0.status==="success"){
          await slink_success.insertOne(_data);
        }
        else if(result_a0.status==="pending"){
          await slink_pending.insertOne(_data);

        }
        
      }
    }
      catch(err){
        console.log(err)
      } finally {
        await client.close();
      }

    
    

}


module.exports=main_wp_post;