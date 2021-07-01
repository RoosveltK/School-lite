import React from "react";
import Layout from "../../../components/Layout";
import Router from "next/router";
import Head from "next/head";
import Loader from "../../../components/Loader/LoaderWait";
// import { Chart } from "react-charts";
// import Participation from "../../../components/graphe/participation";

class Analytic extends React.Component {
  state = {
    user: 0,
  };
  componentDidMount() {
    if (localStorage.getItem("access_token") != null) {
      this.setState({ user: 1 });
    } else {
      Router.push("/");
    }
  }

  render() {
    return (
      <>
        {this.state.user == 0 ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Statistiques">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span></span>
                  </div>
                </header>
                <section className="row">
                  <div className="col-12 content-card">
                    {/* <Participation /> */}
                  </div>
                </section>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
}
export default Analytic;
