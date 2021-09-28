import {useState,useRef,useEffect} from "react";
import { useRouter } from 'next/router';
import dateFormat from "dateformat";
import { Chart } from "react-google-charts";
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Account(props) {
    const [userdetails,setUserDetails]=useState("");
    const [osdetails,setOsDetails]=useState("");
    const [secret,setSecret]=useState(false);
    useEffect(async()=>{
          
        if(props.secret&&props.secret.secret){
           
            const req =await fetch("/api/get_details",{
              method:"POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                secret:props.secret&&props.secret.secret
              })
            })
            const res=await req.json();
            setUserDetails(res)
            const req2 =await fetch("/api/get_os")
            const res2=await req2.json();
            setOsDetails(res2);
           
        }
       

      },[])


    return(<>
    <div className="card">
        <div className="card-body white-back user-card d-flex flex-column align-items-center">
            <div className="card p-2 align-items-center justify-content-center w-100 white-back">
            <img className="rounded" width="100px" height="100px" src="/jojo.png"></img>
          
          
            <span>Kullanıcı Adı: {userdetails&&userdetails.user}</span><br/>
            <span>Gizli Anahtar: <span className="text-danger">{userdetails&&secret?userdetails.secret:<button className="btn btn-outline-danger btn-sm" onClick={()=>{setSecret(true)}}>Göster</button>}</span></span><br/>
            <span>Lisans bitiş tarihi: {userdetails&&dateFormat(new Date(parseInt(userdetails.expire)), "dd/mm/yyyy H:MM")}</span><br/>
            </div>
          
            
            
           
           
            <div className="w-100 d-flex aling-items-center justify-content-center">
            <div id='chart_div' align='center' className="w-50">
            <Chart
            width="100%"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                ['Boşta', Math.round(osdetails.free_mem*100)],
                ['Kullanılan', Math.round(osdetails.total_mem*100-osdetails.free_mem*100)],
    
              ]}
              options={{
                title: 'Ram Kullanımı',
              }}
              
            />
            </div>
            <div id='chart_div' align='center' className="w-50">
             <Chart
              width="100%"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                ['Boşta', 100-Math.round(osdetails.cpu*100)],
                ['Kullanılan', Math.round(osdetails.cpu*100)],
    
              ]}
              options={{
                title: 'CPU kullanımı',
              }}
            
            />
            </div>
           </div>
          
           
           
        </div>
    </div>
    
    </>)
}