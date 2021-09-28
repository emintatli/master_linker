export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Guides(props) {
 
  return (
   <>
  Guide
   
   </>
  )
}
