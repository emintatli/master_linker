import Image from 'next/image'
import nextPic from '../public/next-js.svg'
export default function Footer(props) {


    return (<>
      <div className="card mt-1 footer">
    <div className="card-body d-flex flex-column align-items-center">
    <a className="navbar-brand d-flex flex-row align-items-center justify-content-center">
    <img src="/circle.png" alt="Masslink" width="30" height="30" className="d-inline-block align-text-top me-3"/>
    <span className="logo-text footer-logo">Masslink</span>
    
    </a>
    <div className="card d-flex flex-row align-items-center mt-3">Powered With <i className="fas fa-heart mx-1"></i> and <a className="footer-img" href="https://nextjs.org/"> <Image src={nextPic} width="30px" height="30px" alt="NextJs" /></a></div>
    </div>
  </div>
    
    </>)
}
