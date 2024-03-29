import React from "react";
import Layout from "../../../components/Layout";
import InfoPerso from "../../../components/teacher/infoPerso";
import axios from "axios";

function analyticPersonnel({ post }) {
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
                    <InfoPerso datas={post} key={post.id} />
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`api/user/${params.id}`);
    const post = res.data;

    return { props: { post } };
  } catch (err) {
    console.log(err);
    return { props: { post: "" } };
  }
}

export default analyticPersonnel;
