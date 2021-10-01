import '../styles/main.css'
import Navbar from "../components/nav"
import Footer from "../components/footer"
import Dashmenu from "../components/dashmenu"
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
   <Head>
        <title>MassLink</title>
      </Head>
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
