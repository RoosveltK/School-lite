import "bootstrap/dist/css/bootstrap.css";
import "../shared/style.css";
import "../shared/style1.css";
import "../shared/style2.css";
import "../shared/styleMain.css";
import "../shared/loader.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import { IconContext } from "react-icons";

axios.defaults.baseURL = "http://192.168.8.100:8000/";
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="192x192"
          href="/icon/icon-192x192.png"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
