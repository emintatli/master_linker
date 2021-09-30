import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Link from 'next/link'
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
  <div className="d-flex mobile-cards">
    <div className="card w-100 m-3 border-2">
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>1 Ay</h1>
    
    <img className="mb-4" src="/circle0.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>1 Aylık Masslink deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
    </ul>
    
   <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>


    <div className="card w-100 m-3 border-2 p-2">
    <div className="ribbon ribbon-top-left"><span>İNDİRİMLİ</span></div>
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>3 Ay</h1>
       
    <img className="mb-4" src="/circle2.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>3 Aylık Masslink deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
    </ul>
    
    <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>


    <div className="card w-100 m-3 border-2">
    <div className="ribbon ribbon-top-left"><span>İNDİRİMLİ</span></div>
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>6 Ay</h1>
       
    <img className="mb-4" src="/circle3.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>6 Aylık Masslink deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
    </ul>
    
   <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>
    </div>
   </>
  )
}
