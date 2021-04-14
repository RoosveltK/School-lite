import "bootstrap/dist/css/bootstrap.min.css";
import "../shared/style.css";
import "../shared/style1.css";
import "../shared/style2.css";
import "../shared/styleMain.css";
import axios from "axios";

axios.defaults.baseURL = "";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
