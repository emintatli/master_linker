import { useRouter } from 'next/router'
import { useEffect } from 'react';
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Home(props) {
  const router = useRouter()
  useEffect(()=>{
  
  },[])
  
  return (
   <>
  <div className="d-flex">
    <div className="card w-100 m-3 border-2">
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>1 Ay</h1>
    
    <img className="mb-4" src="/circle0.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>1 Aylık Master Linker deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
      <li>Ücretsiz sunucu paketi yükseltme/indirme</li>
    </ul>
    <span className="text-secondary">*Fiyata sunucu masrafları dahil değildir.</span>
    <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>


    <div className="card w-100 m-3 border-2 p-2">
    <div className="ribbon ribbon-top-left"><span>%25 İNDİRİM</span></div>
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>3 Ay</h1>
       
    <img className="mb-4" src="/circle2.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>3 Aylık Master Linker deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
      <li>Ücretsiz sunucu paketi yükseltme/indirme</li>
    </ul>
    <span className="text-secondary">*Fiyata sunucu masrafları dahil değildir.</span>
    <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>


    <div className="card w-100 m-3 border-2">
    <div className="ribbon ribbon-top-left"><span>%30 İNDİRİM</span></div>
      <div className="card-body white-back d-flex flex-column align-items-center">
        <h1>6 Ay</h1>
       
    <img className="mb-4" src="/circle3.png"/>
    <ul>
      <li>Ücretsiz destek</li>
      <li>6 Aylık Master Linker deneyimi</li>
      <li>Ücretsiz Kurulum/Aktivasyon</li>
      <li>Ücretsiz sunucu paketi yükseltme/indirme</li>
    </ul>
    <span className="text-secondary">*Fiyata sunucu masrafları dahil değildir.</span>
    <button disabled type="button" className="btn btn-outline-secondary">Satın Al</button>
      </div>
    </div>
    </div>
   </>
  )
}
