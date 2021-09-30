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
        <div className="card-body d-flex justify-content-between dash-menu-card mobile-dash">
       <Link href="/dashboard"><a className="btn btn-outline-light w-100 me-1 dash-menu"><i className="fas fa-link border rounded-circle white-back p-1 me-1"></i>Linker</a></Link>
       <Link href="/dashboard/list"><a  className="btn btn-outline-light w-100 me-1 dash-menu"><i className="fas fa-list-alt border rounded-circle white-back p-1 me-1"></i>Liste Oluştur</a></Link>
       <Link href="/dashboard/settings"><a  type="button" className="btn btn-outline-light w-100 me-1 dash-menu"><i className="fas fa-cog border rounded-circle white-back p-1 me-1"></i>Ayarlar</a></Link>
       <Link href="/dashboard/account"><a type="button" className="btn btn-outline-light w-100 me-1 dash-menu"><i className="fas fa-server border rounded-circle white-back p-1 me-1"></i>Hesabım/Sunucu İşlemleri</a></Link>
       <Link href="/dashboard/logs"><a  type="button" className="btn btn-outline-light w-100 me-1 dash-menu"><i className="fas fa-database rounded-circle white-back p-1 me-1"></i>Kayıtlar</a></Link>
        </div>
     </div>}
    
    </>)
}
