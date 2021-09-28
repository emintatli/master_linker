const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const pluginProxy = require('puppeteer-extra-plugin-proxy');
const { enchantPuppeteer } = require('enchant-puppeteer');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const UserAgent = require('user-agents');

const wordpress={
    browser:null,
    page:null,
    initialize:async(proxy,captcha_TOKEN)=>{
    console.log("initialize")
    puppeteer.use(pluginProxy(proxy));
    puppeteer.use(AdblockerPlugin())
    puppeteer.use(StealthPlugin())
    puppeteer.use(
        RecaptchaPlugin({
          provider: { id: '2captcha', token: captcha_TOKEN },
          visualFeedback: false // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      )
    wordpress.browser=await puppeteer.launch({
        headless:true,
        defaultViewport: null,
        args: ['--window-size=1920,1080'],
        slowMo:10,
    });
    
    wordpress.page=await wordpress.browser.newPage();
    let userAgent = new UserAgent();
   await wordpress.page.setUserAgent(userAgent.toString())
   console.log("initialize finished")
},
    comment:async(BASE_URL,COMMENT_TEXT,AUTHOR,USER_EMAIL,USER_URL,DELAY)=>{
        console.log("comment started")
        enchantPuppeteer()
        console.log("comment started 2")
        try{
            console.log("ok")
            await wordpress.page.goto(BASE_URL,{ waitUntil:"networkidle2"});
            
            await wordpress.page.type('textarea[id="comment"]',COMMENT_TEXT,{
                delay:DELAY
            })
            await wordpress.page.type('input[id="author"]',AUTHOR,{
                delay:DELAY
            })
            await wordpress.page.type('input[id="email"]',USER_EMAIL,{
                delay:DELAY
            })
            await wordpress.page.type('input[id="url"]',USER_URL,{
                delay:DELAY
            })
            await wordpress.page.solveRecaptchas()
            await wordpress.page.click('input[id="submit"]')
            console.log("ok2")
          

            try{
               await wordpress.page.goto(BASE_URL,{ waitUntil:"networkidle2"});
                const element = await wordpress.page.$x(`//p[contains(text(),"${COMMENT_TEXT}")]`)

               if(element.length>0){
                
                console.log("ok3")
              // db success !!!
              await wordpress.browser.close();
            return {url:BASE_URL,status:"success"}
               }
               else{
               
               
              // db pending !!!
              await wordpress.browser.close();
              return {url:BASE_URL,status:"pending"}
               }
               }
                
            
            catch(err){
                console.log(err,"secSSSSSSS")
            }
        }
        catch(err){
            console.log(err,"dışardaki")
        }
        finally{
        
           await wordpress.browser.close();
            
        }
       
    }
}


module.exports=wordpress;