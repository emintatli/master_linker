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

  <a className="navbar-brand d-flex flex-row align-items-center justify-content-center" href="/">
  <img src="/circle.png" alt="Master Linker" width="50" height="50" className="d-inline-block align-text-top me-3"/>
  <span className="logo-text">Master Linker</span>
  </a>
    <ul className="navbar-nav d-flex flex-row border p-1 rounded">
      <li className="nav-item p-2 ">
        <a className="nav-link active" aria-current="page" href="/">Anasayfa</a>
      </li>
      <li className="nav-item p-2">
        <a className="nav-link active" aria-current="page" href="/linkscrap">Link Ayrıcı</a>
      </li>
      {props.secret.secret?<><li className="nav-item p-2">
        <a className="nav-link active " href="/dashboard">Backlink Panel</a>
      </li>
      </>:<>
      <li className="nav-item p-2">
        <a className="nav-link active" href="/login">Giriş yap</a>
      </li>
      </>}

      <li className="nav-item p-2">
        <a className="nav-link " href="/guides">SSS</a>
      </li>
    </ul>
 
</div>

</nav>
    
    </>)
}
