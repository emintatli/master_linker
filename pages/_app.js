import '../styles/main.css'
import Navbar from "../components/nav"
import Footer from "../components/footer"
import Dashmenu from "../components/dashmenu"
function MyApp({ Component, pageProps }) {
  return <>
  <div className="container">
    <Navbar {...pageProps}/>
    <Dashmenu {...pageProps}/>
<div className="card mt-2">
  <div className="card-body">
  <Component {...pageProps} />
  </div>
</div>
<Footer {...pageProps}/>
  </div>
  </>
}

export default MyApp
