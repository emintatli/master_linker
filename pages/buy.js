import { useRouter } from 'next/router'
import { useEffect } from 'react';
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Home(props) {
  const router = useRouter()
  useEffect(()=>{
    
  },[])
  
  return (
   <>
  
   
   </>
  )
}
