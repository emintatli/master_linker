import Link from 'next/link'
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Dashmenu(props) {


    return (<>
     {props.secret&&props.secret.secret&&<div className="card ">
        <div className="card-body d-flex justify-content-between dash-menu-card">
       <Link href="/dashboard"><a className="btn btn-outline-light w-100 me-1 dash-menu">Linker</a></Link>
       <Link href="/dashboard/list"><a  className="btn btn-outline-light w-100 me-1 dash-menu">Liste Oluştur</a></Link>
       <Link href="/dashboard/settings"><a  type="button" className="btn btn-outline-light w-100 me-1 dash-menu">Ayarlar</a></Link>
       <Link href="/dashboard/account"><a type="button" className="btn btn-outline-light w-100 me-1 dash-menu">Hesabım/Sunucu Durumu</a></Link>
       <Link href="/dashboard/logs"><a  type="button" className="btn btn-outline-light w-100 me-1 dash-menu">Kayıtlar</a></Link>
        </div>
     </div>}
    
    </>)
}
