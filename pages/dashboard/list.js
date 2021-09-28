import {useState,useRef} from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Dashmenu(props) {
    const backlink_target_url_list=useRef();
    const backlink_target_name_list=useRef();
    const backlink_target_email_list=useRef();
    const backlink_target_comment_list=useRef();
    const backlink_target_delay=useRef();
    const backlink_target_userweb=useRef();
    const [enable,setEnable]=useState(false);
    const [enable2,setEnable2]=useState(false);
    const create_list=()=>{
        const target_url_list_raw=backlink_target_url_list.current.value.split('\n');
        const target_comment_list_raw=backlink_target_comment_list.current.value.split('\n');
        const target_name_list_raw=backlink_target_name_list.current.value.split('\n');
        const target_email_list_raw=backlink_target_email_list.current.value.split('\n');
        const target_download=target_url_list_raw.map((val)=>{
            return {
                BASE_URL:val,
                COMMENT_TEXT:target_comment_list_raw[Math.floor(Math.random() *target_comment_list_raw.length)],
                AUTHOR:target_name_list_raw[Math.floor(Math.random() *target_name_list_raw.length)],
                USER_EMAIL:target_email_list_raw[Math.floor(Math.random() *target_email_list_raw.length)],
                USER_URL:backlink_target_userweb.current.value,
                DELAY:parseInt(backlink_target_delay.current.value),

            }
        
        })
        
        download(`${backlink_target_userweb.current.value}_list.txt`,JSON.stringify(target_download));
    }
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
    return (<>
        {props.secret&&props.secret&&props.secret.secret&&<div className="card ">
           <div className="card-body">
           <span className="pt-3">Backlink Gönderilecek Site Listesi</span><br/>
           Site listeniz yoksa :<Link href="/linkscrap"><a>Link Ayırıcı</a></Link>
           <div className="form-floating proxy-list">
            <textarea onChange={()=>{setEnable2(true)}} ref={backlink_target_url_list} className="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here"></textarea>
            <label htmlFor="floatingTextarea">Hedef siteler her satıra 1 adet <br/>
            https://siteadres.com/3453 <br/>
            https://site123.com/3453 <br/>
            
            </label>
          </div>
         

          
           <span className="pt-3">Yorum listesi</span>
           <div className="form-floating proxy-list">
            <textarea ref={backlink_target_comment_list} className="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here"></textarea>
            <label htmlFor="floatingTextarea">Her satıra 1 yorum (Yorumlar rastgele seçilir, aktif olması için ayarlardan RASTGELE YORUM seçeneğini kapatmanız gerekmektedir.)
            
            </label>
          </div>

          <span className="pt-3">Ad Soyad Listesi</span>
           <div className="form-floating proxy-list">
            <textarea ref={backlink_target_name_list} className="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here"></textarea>
            <label htmlFor="floatingTextarea">Her satıra 1 Ad Soyad (Ad Soyad rastgele seçilir, aktif olması için ayarlardan RASTGELE Ad Soyad seçeneğini kapatmanız gerekmektedir.)
            
            </label>
          
           </div>

           <span className="pt-3">Email Listesi</span>
           <div className="form-floating proxy-list">
            <textarea ref={backlink_target_email_list} className="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here"></textarea>
            <label htmlFor="floatingTextarea">Her satıra 1 Email (Email rastgele seçilir, aktif olması için ayarlardan RASTGELE Email seçeneğini kapatmanız gerekmektedir.)
            
            </label>
          
           </div>

          
           <span className="pt-3">Gecikme (ms)</span>
            <input ref={backlink_target_delay} type="number" className="form-control mt-2" placeholder="Gecikme (ms)  Aktif olması için ayarlardan RASTGELE Gecikme seçeneğini kapatmanız gerekmektedir." aria-label="Username" aria-describedby="basic-addon1"/>
           

            <span className="pt-3">Site Adresi (linki eklenecek olan adres)</span>
            <input onChange={()=>{setEnable(true)}} ref={backlink_target_userweb} type="text" className="form-control mt-2" placeholder="Kişisel web adresinizi yazınız (çıkılan linkler bu adrese olacaktır.)" aria-label="Username" aria-describedby="basic-addon1"/>
            <button disabled={!enable||!enable2} onClick={create_list} type="button" className="btn btn-outline-secondary w-100 white-back mt-2">Oluştur</button>
           </div>
        </div>}
       
       </>)
}
