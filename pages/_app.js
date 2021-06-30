import "bootstrap/dist/css/bootstrap.css";
import "../shared/App.css";
import "../shared/style.css";
import "../shared/style1.css";
import "../shared/style2.css";
import "../shared/styleMain.css";
import "../shared/loader.css";
import "../shared/loaderGlobal.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import { IconContext } from "react-icons";
import "react-toastify/dist/ReactToastify.css";
import NextNprogress from "nextjs-progressbar";

axios.defaults.baseURL = "https://school-lite-2002.herokuapp.com/";

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
        <meta
          name="description"
          content="A website to manage a school online"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
      <NextNprogress
        color="#333"
        startPosition={0.3}
        stopDelayMs={200}
        height="5"
      />
    </>
  );
}

export default MyApp;
