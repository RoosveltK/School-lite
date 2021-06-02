import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import InfoPerso from "../../../components/student/infoPerso";
import axios from "axios";
import Loader from "../../../components/Loader/LoaderWait";
import Router from "next/router";
import Head from "next/head";

function analyticPersonnel({ post, specialites }) {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get(`api/user/currentuser`)
  //     .then((res) => setUser(res.data))
  //     .catch((err) => Router.push("/"));
  // }, []);
  return (
    <>
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
                      specialites={specialites}
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
      )
    </>
  );
}
export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`api/user/${params.id}`);
    const post = res.data;
    const special = await axios.get(`api/school/speciality`);
    const specialites = special.data;

    return { props: { post, specialites } };
  } catch (err) {
    console.log(err);
    return { props: { post: "", specialites: [] } };
  }
}

export async function getStaticPaths() {
  const res = await axios.get(`api/user`);
  const posts = res.data;

  try {
    const paths = posts.map((post) => `/admin/eleve/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}
export default analyticPersonnel;
