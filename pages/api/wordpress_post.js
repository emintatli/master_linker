const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const pluginProxy = require('puppeteer-extra-plugin-proxy');
const { enchantPuppeteer } = require('enchant-puppeteer');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const UserAgent = require('user-agents');
const cheerio = require('cheerio');

const wordpress={
    browser:null,
    page:null,
    initialize:async(proxy,captcha_TOKEN)=>{
       try{
        puppeteer.use(pluginProxy(proxy));
        puppeteer.use(AdblockerPlugin())
        puppeteer.use(StealthPlugin())
        puppeteer.use(
            RecaptchaPlugin({
              provider: { id: '2captcha', token: captcha_TOKEN },
              visualFeedback: false // colorize reCAPTCHAs (violet = detected, green = solved)
            })
          )
          try{
            wordpress.browser=await puppeteer.launch({
                headless:true,
                defaultViewport: null,
                args: ['--window-size=1920,1080','--no-sandbox','--ignore-certificate-errors',  '--disable-setuid-sandbox','--blink-settings=imagesEnabled=false',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--disable-gpu',
                '--no-zygote'],
            });
          }
          catch(err){
              console.log(err)
              await wordpress.browser.close();
          }
    
        wordpress.page=await wordpress.browser.newPage();
        let userAgent = new UserAgent();
       await wordpress.page.setUserAgent(userAgent.toString())
       await wordpress.page.setDefaultNavigationTimeout(20000); 
       }
       catch(err){
        await wordpress.browser.close();
           console.log(err)
       }
   
},
    comment:async(BASE_URL,COMMENT_TEXT,AUTHOR,USER_EMAIL,USER_URL,DELAY)=>{
        
       
        enchantPuppeteer()
    
        try{
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
           
          

            try{
               await wordpress.page.goto(BASE_URL,{ waitUntil:"networkidle2"});
               const cheer = cheerio.load(COMMENT_TEXT);
               let link=false;
               let element=[];
               if(cheer("a").first().attr('href')!==undefined && cheer("a").first().attr('href')!==null){
                const link2= await wordpress.page.$(`a[href*="${cheer("a").first().attr('href')}"]`);
                if(link2){
                   
                    link=true;
                }
               }
               else{
                   
                 element = await wordpress.page.$x(`//*[contains(text(),"${COMMENT_TEXT}")]`)
               }
                
               
               
               if(element.length>0 || link){
                
              
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
                console.log(err)
                await wordpress.browser.close();
                return {url:BASE_URL,status:"pending"}
            }
        }
        catch(err){
           
            
           await wordpress.browser.close();
            
            return {url:BASE_URL,status:"error"}
        }
        finally{
        
           await wordpress.browser.close();
            
        }
    }
}


module.exports=wordpress;