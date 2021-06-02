import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

function CoursPerso({ post, program }) {
  const [detailProgram, setdetailProgram] = useState(null);
  useEffect(() => {
    let trv = 0;
    program.forEach((element) => {
      if (element.id == post.program) {
        setdetailProgram(element);
        trv = 1;
      }
    });
    if (trv == 0) {
      const datas = {
        title: "",
        describe: "",
        limit_day: "",
        begin_time: "",
      };
      setdetailProgram(datas);
    }
  });

  return (
    <>
      <Layout title="Lecons">
        <div className="container-fluid">
          <div className="mainCardLesson">
            {post == "" ? (
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                LECON PAS ENCORE INDISPONIBLE
              </div>
            ) : (
              <React.Fragment>
                <h2 style={{ border: "1px solid" }}>
                  {detailProgram == null
                    ? null
                    : detailProgram.title.toUpperCase()}
                </h2>
                <div className="col-12 header-card">
                  <span>
                    <u> Description:</u>{" "}
                    {detailProgram == null ? null : detailProgram.describe}{" "}
                  </span>
                </div>
                <div className="caderScroll">
                  {ReactHtmlParser(post.content)}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`api/school/lecon_by_program/${params.id}`);
    const prog = await axios.get(`api/school/program`);

    const post = res.data;
    const program = prog.data;

    return { props: { post, program } };
  } catch (err) {
    console.log(err);
    return { props: { post: "", program: [] } };
  }
}

export async function getStaticPaths() {
  const res = await axios.get(`api/school/lecon`);
  const posts = res.data;
  try {
    const paths = posts.map((post) => `/admin/cours/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}
export default CoursPerso;
