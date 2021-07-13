import LayoutS from "../../../components/LayoutS";
import React, { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

function CoursPerso({ post, program }) {
  const [detailProgram, setdetailProgram] = useState(program);

  return (
    <>
      <LayoutS title="Lecons">
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
                LECON PAS ENCORE DISPONIBLE
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
                  <div
                    className="caderCours-btn"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button className="btn">
                      <Link href={`/student/cours/tests/${detailProgram.id}`}>
                        <a>Faire le test maintenant &rarr;</a>
                      </Link>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </LayoutS>
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`api/school/lecon_by_program/${params.id}`);
    const prog = await axios.get(`api/school/program/${params.id}`);

    const post = res.data;
    const program = prog.data;

    return { props: { post, program } };
  } catch (err) {
    console.log(err);
    return { props: { post: "", program: "" } };
  }
}

export default CoursPerso;
