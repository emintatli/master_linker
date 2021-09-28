import {useRef,useState,useEffect} from "react"
import { useRouter } from 'next/router'
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
  secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Home(props) {
    const [login_err,setLogin_err]=useState(false);
    const [loading,setLoading]=useState(false);
    const router = useRouter()
    const secret_input=useRef();
    useEffect(()=>{
        if(props.secret){
            router.push("/dashboard")
        }
        
    },[props.secret])
    const login_req=async()=>{
        setLoading(true);
        const req =await fetch("/api/login",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _secret:secret_input.current.value
            })
          })
          const res=await req.json();
          if(res.success){
            router.push("/dashboard")
          }
          else{
            secret_input.current.value="";
            setLogin_err(true);
          }
          setLoading(false);
    }

    return(!props.secret&&<div className="d-flex flex-column align-items-center justify-content-center">
    {
       login_err&&<div className="alert alert-light text-red" role="alert">
        A simple light alert—check it out!
      </div>

    }
    {props.secret}
    <div className="card w-50">
        <div className="card-body login-card">
  <input ref={secret_input} type="text" className="form-control" placeholder="Secret Key" aria-label="Username" aria-describedby="basic-addon1"/>
  <button type="button" className="btn btn-outline-light mt-1 w-100" disabled={loading} onClick={login_req}>Login</button>

        </div>
    </div>
    </div>)
}