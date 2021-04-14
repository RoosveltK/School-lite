import "bootstrap/dist/css/bootstrap.css";
import "../shared/style.css";
import "../shared/style1.css";
import "../shared/style2.css";
import "../shared/styleMain.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
