import {useState,useRef,useEffect} from "react";
import { useRouter } from 'next/router';
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Settings(props) {
    const router = useRouter()
    const capi_input=useRef();
    const COMMENT_TEXT=useRef();
    const AUTHOR=useRef();
    const USER_EMAIL=useRef();
    const DELAY=useRef();
    const [loading,setLoading]=useState(false);
    const new_proxy_textare=useState();
    const [twoChap,settwoChap]=useState("");
    const [settings,setSettings]=useState({
        COMMENT_TEXT:true,
        AUTHOR:true,
        USER_EMAIL:true,
        DELAY:true,
        success:true,
      });
      const [loadProxy,setLoadProxy]=useState([]);
      useEffect(async()=>{
          
        if(props.secret.secret){
            setLoading(true);
            const req =await fetch("/api/get_details",{
              method:"POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                secret:props.secret.secret
              })
            })
            const res=await req.json();
          
            settwoChap(res.capi_secret)
            setSettings(res.random_text_gen)
            setLoadProxy(res.proxy_list);
            setLoading(false);
        }
       

      },[])

    const send_update_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/update",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret.secret,
            capi_secret:capi_input.current.value!==""?capi_input.current.value:"empty"
          })
        })
        const res=await req.json();
        setLoading(false);
        router.reload(window.location.pathname)
      }
   

      const send_setting_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/update",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret.secret,
            random_text_gen:{
                COMMENT_TEXT:COMMENT_TEXT.current.checked,
                AUTHOR:AUTHOR.current.checked,
                USER_EMAIL:USER_EMAIL.current.checked,
                DELAY:DELAY.current.checked,
            }
          })
        })
        const res=await req.json();
        console.log(res)
        setLoading(false);
        router.reload(window.location.pathname)
      }

      const send_new_proxies=async()=>{
        const new_proxies_raw=new_proxy_textare.current.value.split('\n')
        const mapped_new_proxies=new_proxies_raw.map((value)=>{return value.split(":")})
        const new_proxies_ready=mapped_new_proxies.map((val)=>{return {
          address:val[0],
          port:val[1],
          credentials:{
            username:val[2],
            password:val[3]
          }
        }})

        setLoading(true);
        const req =await fetch("/api/update",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret.secret,
            proxy_list:new_proxies_ready
          })
        })
        const res=await req.json();
     
        setLoading(false);
        router.reload(window.location.pathname)
      }

    return (<>
          <div className="card w-100 m-2">
        <div className="card-body">
          
          <div className="alert alert-light d-flex align-items-center chp2-alert" role="alert">
          <span className="ms-2 fw-bold">2captcha API KEY (Boş bırakıldığı takdirde captcha içeren siteler atlanır.)</span>
          
          
          </div>
          <div className="input-group mb-3">
        <input ref={capi_input} type="text" className={`form-control mb-2 chp2-input ${props.secret.capi?"chp2-green":"ch2-red"}`} placeholder={`${props.secret.capi?twoChap:"Yeni 2Chapta API KEY (Değiştirmek istiyorsanız girin)"}`} aria-describedby="basic-addon1"/>

       
        </div>        
     <button className="btn btn-outline-secondary white-back w-100" disabled={loading} onClick={send_update_req}>Güncelle</button>
     </div>
      </div>
      <div className="card w-100 m-2">
        <div className="card-body">
        <div className="alert alert-light d-flex align-items-center chp2-alert" role="alert">
          <span className="ms-2 fw-bold">Linker ayarları</span>
          
          
          </div>
          <div className="alert alert-light d-flex chp2-alert p-3 flex-column" role="alert">
          <div class="form-check form-switch mb-2">
            <input ref={COMMENT_TEXT} defaultChecked={settings.COMMENT_TEXT} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault1"/>
            <label class="form-check-label" for="flexSwitchCheckDefault1">Rastgele yorum üret</label>
            </div>

            <div class="form-check form-switch mb-2">
            <input ref={AUTHOR} defaultChecked={settings.AUTHOR} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault2"/>
            <label class="form-check-label" for="flexSwitchCheckDefault2">Rastgele ad soyad üret</label>
            </div>

            <div class="form-check form-switch mb-2">
            <input ref={USER_EMAIL} defaultChecked={settings.USER_EMAIL} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault3"/>
            <label class="form-check-label" for="flexSwitchCheckDefault3">Rastgele e-mail üret</label>
            </div>

            <div class="form-check form-switch mb-2">
            <input ref={DELAY} defaultChecked={settings.DELAY} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault4"/>
            <label class="form-check-label" for="flexSwitchCheckDefault4">Rastgele gecikme üret</label>
            </div>
 
           
          
          
          </div>
          <button onClick={send_setting_req} disabled={loading} type="button" class="btn btn-outline-secondary w-100 white-back">Kaydet</button>
        </div>
      </div>
      <div className="card w-100 m-2">
        <div className="card-body">
        <div className="alert alert-light d-flex align-items-center chp2-alert" role="alert">
          <span className="ms-2 fw-bold">Proxy (Minimum 1 proxy girilmesi gerekmektedir.)</span>
          </div>
          Aktif Proxyler :
          <div class="form-floating">
              <div className="card">
            <div className="card-body scroll-div" disabled>
            {loadProxy[0]&&loadProxy.map((value)=><><p className="proxy-list-item">{value.address}:{value.port}
            :{value.credentials.username}:{value.credentials.password}</p></>)}
            </div>
            </div>
            </div>
            
            <div className="pt-3">Yeni Proxy Listesi Ekle <span className="text-white">(Öncekiler Silinir)</span></div>
            <div class="form-floating proxy-list">
            <textarea ref={new_proxy_textare} class="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label for="floatingTextarea">Proxy Listesi (Her satıra bir proxy IP:PORT:USERNAME:PASSWORD)</label>
          </div>
          <button onClick={send_new_proxies} disabled={loading} type="button" class="btn btn-outline-secondary w-100 white-back mt-2">Kaydet</button>
        </div>
      </div>
    </>)
}
