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
            secret:props.secret.secret,
          })
        })
        const res=await req.json();
        
        setUserData(res);
        setLoading(false);
    }
    const handleChange=(event)=>{
        
        setselectBox(event.target.value)
    }

    return(<>
        <h4>Kayıtlar:</h4>
        <select onChange={handleChange} class="form-select" aria-label="Default select example">
        <option value="success">Başarılı</option>
        <option value="pending">Onay Bekleyen</option>
        </select>
          <div class="form-floating">
              <div className="card">
            <div className="card-body scroll-div-logs" disabled>
            {selectBox==="success"&&userData.user_data&&userData.user_data.user_success_data.slice(0).reverse().map(
                (value)=><div className="d-flex justify-content-between">

<p className="proxy-list-item back-green">{value.url}</p>
<p className="proxy-list-item back-green">{value.time?dateFormat(value.time, "dd,mm,yyyy, H:MM:ss"):"?"}</p>

                </div>)}
            {selectBox==="pending"&&userData.user_data&&userData.user_data.user_pending_data.slice(0).reverse().map(
                (value)=><div className="d-flex justify-content-between">

                <p className="proxy-list-item back-yellow">{value.url}</p>
                <p className="proxy-list-item back-yellow">{value.time?dateFormat(value.time, "dd/mm/yyyy H:MM:ss"):"?"}</p>
                
                                </div>)}
            </div>
            </div>
            </div>
            <button disabled={loading} onClick={get_data} type="button" class="btn btn-outline-secondary w-100 mt-2 white-back">Yenile</button>
            
    </>)
}