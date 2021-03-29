import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shared/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
