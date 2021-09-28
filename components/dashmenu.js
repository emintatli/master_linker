
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
     {props.secret.secret&&<div className="card ">
        <div className="card-body d-flex justify-content-between dash-menu-card">
        <a href="/dashboard" class="btn btn-outline-light w-100 me-1 dash-menu">Linker</a>
        <a href="/dashboard/list" class="btn btn-outline-light w-100 me-1 dash-menu">Liste Oluştur</a>
        <a href="/dashboard/settings" type="button" class="btn btn-outline-light w-100 me-1 dash-menu">Ayarlar</a>
        <a href="/dashboard/account" type="button" class="btn btn-outline-light w-100 me-1 dash-menu">Hesabım/Sunucu Durumu</a>
        <a href="/dashboard/logs" type="button" class="btn btn-outline-light w-100 me-1 dash-menu">Kayıtlar</a>
        </div>
     </div>}
    
    </>)
}
