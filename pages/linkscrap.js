import {useState,useRef,useEffect} from "react";
import Papa from "papaparse";
import { useRouter } from 'next/router';
import dateFormat from "dateformat";
export async function getServerSideProps(context){
	const req= context.req;
return{
props:{
secret:req.cookies.secret&&JSON.parse(req.cookies.secret)||""
}
}
}
export default function Navbar(props) {
    const [loading,setLoading]=useState(false);
    const [csvdata,setCsvData]=useState("");
    const [file,setfile]=useState(false);
    const router = useRouter();

    const [linkSettings,setLinkSettings]=useState({
        max_external:1000,
        min_dr:10,
        min_ur:10,
        type:""
    });

    useEffect(()=>{
      if(!props.secret&&!props.secret.secret){
        router.push("/login")
      }
    },[])
    const scrap_request=async()=>{
        console.log(linkSettings)
        if(csvdata){
            setLoading(true);

            const req =await fetch("/api/excel_todata",{
              method:"POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                secret:props.secret.secret&&props.secret.secret,
                csv:csvdata,
                settings:linkSettings
              })
            })
            const res=await req.json();
            console.log(res)
            let text_to_download="";
            res.data.map((v,i)=>text_to_download=text_to_download+v+(i!==res.data.length-1?"\n":""));
            const now_date=Date.now();
            download(`scrap_list_${dateFormat(now_date, "dd-mm-yyyy.H_MM")}.txt`,text_to_download);
            setLoading(false);
            
        }
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
          }
       

    }
    const showFile = async (e) => {
        e.preventDefault()
        try{
          const reader = new FileReader()
          reader.onload = async (e) => { 
            const text = (e.target.result)
            console.log(e)
              Papa.parse(text, {
                  complete: function(results) {
  
                      setCsvData(results.data);
                      
                      
                  }})
          };
          reader.readAsText(e.target.files[0])
          setfile(true)
        }
        catch(err){
          setfile(false)
        }
       
      }
      

      

    return (<>
<span className="fw-bold">Ahrefs dan aldığınız CSV dosyasını yükleyiniz (Microsoft Excel (UTF-16) Formatında olmalıdır.)</span><br/>
<div>

  <label style={{backgroundColor:file?"green":"#dc3545"}} htmlFor="files" className="btn btn-outline-secondary white-back text-light"><i className="fas fa-file"></i>{file?"Dosya Seçildi":"Dosyayı seç"}</label>
  <input  className="" id="files" type="file" style={{display:"none"}} onChange={(e) =>showFile(e) } />
</div>

<div className="card mt-1 w-100">
    <div className="card-body white-back">
    Minimum DR
    <input onChange={(e)=>{setLinkSettings({...linkSettings,min_dr:e.target.value})}}  type="number" className="form-control" placeholder="0-100" aria-label="Username" aria-describedby="basic-addon1"/>
    Minimum UR
    <input onChange={(e)=>{setLinkSettings({...linkSettings,min_ur:e.target.value})}}  type="number" className="form-control" placeholder="0-100" aria-label="Username" aria-describedby="basic-addon1"/>
    Maksimum Link Çıkışı (External)
    <input onChange={(e)=>{setLinkSettings({...linkSettings,max_external:e.target.value})}} type="number" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>

    
    Link türü
    <select onChange={(e)=>{setLinkSettings({...linkSettings,type:e.target.value})}} className="form-select" aria-label="Default select example">
        <option value="">Hepsi</option>
        <option value="Dofollow">DoFollow</option>
        <option value="Nofollow">NoFollow</option>
        </select>
    </div>
</div>
<button disabled={csvdata===""||loading || !file} onClick={scrap_request}   type="button" className="btn btn-outline-secondary w-100 white-back mt-2"><i className="fas fa-paper-plane"></i> Gönder</button>
    </>)
}
