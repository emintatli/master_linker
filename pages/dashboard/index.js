import {useState,useRef} from "react";
import { useRouter } from 'next/router';

export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Home(props) {
  const [loading,setLoading]=useState(false);
  const new_list_textare=useRef();
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
              _secret:props.secret.secret
            })
          })
          const res=await req.json();
          setLoading(false);
         
          setRequest(res);
        }
      }
     

    }


    return (
      <>

     {props.secret.secret&&<div className="d-flex flex-row flex-wrap">
       <div className="w-100 m-2">
         <div className="card-body user-card">
           <img className="m-1" width="20px" height="20px" src="./user.png"/>
         <span className="welcome-text">Hoşgeldiniz , {props.secret.user}</span>
         </div>
        </div>
       
      <div className="card w-100 m-2">
        <div className="card-body">
        <div className="pt-3">Yeni Backlink İsteği Gönder <span className="text-white">(Öncekiler devam eder)</span></div> Listeniz yoksa :<a href="/dashboard/list">Liste Oluşturucu</a>
            <div class="form-floating proxy-list">
            <textarea ref={new_list_textare} class="form-control" style={{height:300}} id="proxy-add-list" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            <label for="floatingTextarea">Backlink listesi (Liste oluşturucudan aldığınız çıktıyı yapıştırınız)</label>
          </div>
        <button disabled={loading} className="btn btn-outline-secondary w-100 white-back mt-2" onClick={send_req}>Gönder</button>
        <div class={`alert alert-success mt-2 ${request.message!=="Process has been started."&&"d-none"}`} role="alert">
         <h3> İşlem başlatıldı!</h3> <br/>
         Kayıtlar kısmından işlemlerinizi takip edebilirsiniz. <br/>
          Proxy Sayısı : {request.proxy_count&&request.proxy_count} <br/>
          Toplam Link : {request.total&&request.total}
        </div>
        <div class={`alert alert-danger mt-2 ${request.message!=="Error occured."&&"d-none"}`} role="alert">
         <h3> İşlem başarısız!</h3> <br/>
         Lütfen Liste Oluştur kısmından aldığınız listeyi düzgün bir biçimde boşluk olmadan ilgili alana giriniz. <br/>
        </div>
        </div>
      </div>

      
      </div>}
     </>
    )
  }
  