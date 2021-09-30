import {useState,useRef,useEffect} from "react";
import { useRouter } from 'next/router';
import dateFormat from "dateformat";
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Settings(props) {
    const [loading,setLoading]=useState(false);
    const [userData,setUserData]=useState([]);
    const [selectBox,setselectBox]=useState("success");
    const get_data=async()=>{
        setLoading(true);
        const req =await fetch("/api/get_logs",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret&&props.secret.secret,
          })
        })
        const res=await req.json();
        
        setUserData(res);
        setLoading(false);
    }
    const handleChange=(event)=>{
        
        setselectBox(event.target.value)
    }
    const export_data=()=>{
      let export_data_raw=[];
      let export_data="";
      if(selectBox==="pending"&&userData.user_data){
       export_data_raw=userData.user_data.user_pending_data.slice(0).reverse()
      }
      else if(selectBox==="success"&&userData.user_data){
        export_data_raw=userData.user_data.user_success_data.slice(0).reverse()
      }
      export_data_raw.map((value,index)=>{export_data=export_data+value.url+(index!==export_data_raw.length-1?"\n":"")})
      const now_date=Date.now();
      
      download(`${selectBox}_log_list_${dateFormat(now_date, "dd-mm-yyyy.H_MM")}.txt`,export_data);
    
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

    return(<>
        <h4>Kayıtlar:</h4>
        <select onChange={handleChange} className="form-select" aria-label="Default select example">
        <option value="success">Başarılı</option>
        <option value="pending">Onay Bekleyen</option>
        </select>
          <div className="form-floating">
              <div className="card">
            <div className="card-body scroll-div-logs mobile-reports" disabled>
            {selectBox==="success"&&userData.user_data&&userData.user_data.user_success_data.slice(0).reverse().map(
                (value,index)=><div key={index} className="d-flex justify-content-between">

<p className="proxy-list-item back-green">{value.url}</p>
<p className="proxy-list-item back-green mobile-reports-none">{value.time?dateFormat(value.time, "dd,mm,yyyy, H:MM:ss"):"?"}</p>

                </div>)}
            {selectBox==="pending"&&userData.user_data&&userData.user_data.user_pending_data.slice(0).reverse().map(
                (value,index)=><div key={index} className="d-flex justify-content-between">

                <p className="proxy-list-item back-yellow ">{value.url}</p>
                <p className="proxy-list-item back-yellow mobile-reports">{value.time?dateFormat(value.time, "dd/mm/yyyy H:MM:ss"):"?"}</p>
                
                                </div>)}
            </div>
            </div>
            </div>
            <button disabled={loading} onClick={get_data} type="button" className="btn btn-outline-secondary w-100 mt-2 white-back"><i className="fas fa-sync-alt"></i> Yenile</button>
            <button disabled={loading} onClick={export_data} type="button" className="btn btn-outline-secondary w-100 mt-2 white-back"><i className="fas fa-sync-alt"></i> Dışarı Aktar (TXT)</button>
            
    </>)
}