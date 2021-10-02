import {useState,useRef} from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Home(props) {
  const [loading,setLoading]=useState(false);
  const new_list_textare=useRef();
  const [status,setStatus]=useState("?");
  const [active,setActive]=useState(false);
  const [request,setRequest]=useState({
    message:""
  });
    const send_req=async()=>{
     
      if(JSON.parse(new_list_textare.current.value).length>0){
        if(JSON.parse(new_list_textare.current.value)[0].BASE_URL && JSON.parse(new_list_textare.current.value)[0].USER_URL){
          setLoading(true)
          const req =await fetch("/api/wp",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              capi_secret:props.secret.capi,
              do_list:JSON.parse(new_list_textare.current.value),
              _secret:props.secret.secret&&props.secret.secret
            })
          })
          const res=await req.json();
          setLoading(false);
         
          setRequest(res);
        }
      }
     

    }

    const send_status_refresh_req=async()=>{
      setLoading(true)
      const req =await fetch("/api/get_status",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          secret:props.secret.secret&&props.secret.secret
        })
      })
      const res=await req.json();
      console.log(res)
      setStatus(res.status);
      setLoading(false);

    }


    return (
      <>

     {props.secret&&props.secret.secret&&<div className="d-flex flex-row flex-wrap">
       <div className="w-100 m-2">
         <div className="card-body user-card">
           <img className="m-1" width="20px" height="20px" src="./user.png"/>
         <span className="welcome-text">Hoşgeldiniz , {props.secret.user}</span>
         </div>
        </div>

      <div className="card w-100 m-2">
        <div className="card-body">
        <div className="pt-3">Yeni Backlink İsteği Gönder</div> Listeniz yoksa :<Link href="/dashboard/list"><a>Liste Oluşturucu</a></Link>
           <div className="card black-back">
             <div className="card-body d-flex align-items-center justify-content-center text-light flex-column">
               <div className="d-flex mb-1">
            <h3>{"Program Durumu : "+status}</h3> <button disabled={loading} onClick={send_status_refresh_req} type="button" className="btn btn-outline-danger ms-5"><i className="fas fa-sync-alt"></i> Yenile</button></div>
            DEVAM EDEN İŞLEM VARSA BİTENE KADAR BEKLEYİNİZ!
             </div>
           </div>
            <div className="form-floating proxy-list">
            <textarea onChange={()=>{new_list_textare.current.value!==""?setActive(true):setActive(false)}} ref={new_list_textare} className="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here"></textarea>
            <label htmlFor="floatingTextarea">Backlink listesi (Liste oluşturucudan aldığınız çıktıyı yapıştırınız)</label>
          </div>
        <button disabled={loading || !active} className="btn btn-outline-secondary w-100 white-back mt-2" onClick={send_req}><i className="fas fa-paper-plane"></i> Gönder</button>
        <div className={`alert alert-success mt-2 ${request.message!=="Process has been started."&&"d-none"}`} role="alert">
         <h3> İşlem başlatıldı!</h3> <br/>
         Kayıtlar kısmından işlemlerinizi takip edebilirsiniz. <br/>
          Proxy Sayısı : {request.proxy_count&&request.proxy_count} <br/>
          Toplam Link : {request.total&&request.total}
        </div>
        <div className={`alert alert-danger mt-2 ${request.message!=="Error occured."&&"d-none"}`} role="alert">
         <h3> İşlem başarısız!</h3> <br/>
         Lütfen Liste Oluştur kısmından aldığınız listeyi düzgün bir biçimde boşluk olmadan ilgili alana giriniz. <br/>
        </div>
        </div>
      </div>

      
      </div>}
     </>
    )
  }
  