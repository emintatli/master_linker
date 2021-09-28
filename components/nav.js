import Link from 'next/link'
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Navbar(props) {


    return (<>
    <nav className="navbar navbar-light bg-light">
<div className="container-fluid ">

  <Link href="/"><a className="navbar-brand d-flex flex-row align-items-center justify-content-center" >
  <img src="/circle.png" alt="Master Linker" width="50" height="50" className="d-inline-block align-text-top me-3"/>
  <span className="logo-text">Master Linker</span>
  </a></Link>
    <ul className="navbar-nav d-flex flex-row border p-1 rounded">
      <li className="nav-item p-2 ">
      <Link href="/"><a className="nav-link active" aria-current="page">Anasayfa</a></Link>
      </li>
      <li className="nav-item p-2">
      <Link href="/linkscrap"><a className="nav-link active" aria-current="page" >Link Ayrıcı</a></Link>
      </li>
      {props.secret.secret?<><li className="nav-item p-2">
      <Link href="/dashboard"><a className="nav-link active " >Backlink Panel</a></Link>
      </li>
      </>:<>
      <li className="nav-item p-2">
      <Link href="/login"><a className="nav-link active" >Giriş yap</a></Link>
      </li>
      </>}

      <li className="nav-item p-2">
      <Link  href="/guides"><a className="nav-link ">SSS</a></Link>
      </li>
    </ul>
 
</div>

</nav>
    
    </>)
}
