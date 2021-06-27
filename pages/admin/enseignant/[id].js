import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import InfoPerso from "../../../components/teacher/infoPerso";
import axios from "axios";
import Loader from "../../../components/Loader/LoaderWait";
import Router from "next/router";
import Head from "next/head";

function analyticPersonnel({ post, departement }) {
  return (
    <>
      {/* {user != null ? (
        <React.Fragment>
          <Head>
            <title>School online</title>
          </Head>
          <Loader />
        </React.Fragment>
      ) : ( */}
      <Layout title={post.first_name}>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>INFORMATIONS</span>
              </div>
            </header>
            <section className="row">
              <div className="col-12 content-card">
                <table
                  id="datatable"
                  className="table dt-responsive nowrap"
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    width: "100%",
                  }}
                >
                  <tbody>
                    <InfoPerso
                      departements={departement}
                      datas={post}
                      key={post.id}
                    />
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </Layout>
      {/* )}{" "} */}
    </>
  );
}
export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`api/user/${params.id}`);
    const post = res.data;
    const departs = await axios.get(`api/user/departement`);
    const departement = departs.data;
    return { props: { post, departement } };
  } catch (err) {
    console.log(err);
    return { props: { post: "" } };
  }
}

export async function getStaticPaths() {
  const res = await axios.get(`api/user`);
  const posts = res.data;
  try {
    const paths = posts.map((post) => `/admin/enseignant/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}
export default analyticPersonnel;
