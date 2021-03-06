import {useState,useRef,useEffect} from "react";
import { useRouter } from 'next/router';
import dateFormat from "dateformat";
import { Chart } from "react-google-charts";
import Link from 'next/link'
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
    const [loading,setLoading]=useState(false);
    const router = useRouter()
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

      const send_logout_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/logout",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret.secret&&props.secret.secret
          })
        })
        const res=await req.json();
        if(res.success){
          router.push("/login")
        }
        setLoading(false);
      }
      
      const send_log_delete_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/delete_logs",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            secret:props.secret.secret&&props.secret.secret
          })
        })
        const res=await req.json();
        if(res.success){
          alert("Kay??tlar silindi!")
        }
        setLoading(false);
      }

      const send_reboot_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/reboot",{
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
        setLoading(false);
      }


    return(<>
    {loading&&<div className="loading">Loading&#8230;</div>}
    <div className="card">
        <div className="card-body white-back user-card d-flex flex-column align-items-center">
          <div className="d-flex w-100">
            <div className="card p-2 align-items-center justify-content-center w-100 white-back">
            <img className="rounded" width="100px" height="100px" src="/jojo.png"></img>
          
          
            <span>Kullan??c?? Ad??: {userdetails&&userdetails.user}</span><br/>
            <span>Gizli Anahtar: <span className="text-danger">{userdetails&&secret?userdetails.secret:<button className="btn btn-outline-danger btn-sm" onClick={()=>{setSecret(true)}}><i className="fas fa-eye"></i> G??ster</button>}</span></span><br/>
            <span>Lisans biti?? tarihi: {userdetails&&dateFormat(new Date(parseInt(userdetails.expire)), "dd/mm/yyyy H:MM")}</span><br/>
            </div>
            <div className="card p-2 w-100 white-back">
            <h3>Di??er ????lemler:</h3>
            <Link href="/" ><a className="btn btn-outline-danger btn-sm mb-2 disabled" >Lisans S??resi Uzat</a></Link>
            <button onClick={send_logout_req} className="btn btn-outline-danger btn-sm mb-2" disabled={loading}><i className="fas fa-sign-out-alt"></i> ????k???? Yap</button>

            <div className="d-flex flex-column mt-4 border-dotted-danger p-2">
            <button onClick={send_log_delete_req} className="btn btn-danger btn-sm mb-2" disabled={loading}><i className="fas fa-exclamation-triangle"></i> Kay??tlar?? Sil</button>
            <button  onClick={send_reboot_req} className="btn btn-danger btn-sm mb-2" disabled={loading}><i className="fas fa-exclamation-triangle"></i> Sunucu Reboot</button>
            </div>
            </div>
          
            </div>
            
           
           
            <div className="w-100 d-flex aling-items-center justify-content-center">
            <div id='chart_div' align='center' className="w-50">
            <Chart
            width="100%"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                ['Bo??ta', Math.round(osdetails.free_mem*100)],
                ['Kullan??lan', Math.round(osdetails.total_mem*100-osdetails.free_mem*100)],
    
              ]}
              options={{
                title: 'Ram Kullan??m??',
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
                ['Bo??ta', 100-Math.round(osdetails.cpu*100)],
                ['Kullan??lan', Math.round(osdetails.cpu*100)],
    
              ]}
              options={{
                title: 'CPU kullan??m??',
              }}
            
            />
            </div>
           </div>
          
           
           
        </div>
    </div>
    
    </>)
}