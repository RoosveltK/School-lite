import React from "react";
import Layout from "../../../../components/Layout";
import { FcCheckmark } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";

function TestPerso({ recuperation }) {
  return (
    <>
      <Layout title="VoirTest">
        <div className="container-fluid">
          <div className="mainCardLesson">
            {recuperation.map((recup, index) => {
              return (
                <div className="caderViewTest">
                  <h3>
                    Question {index + 1}: {recup.content}
                  </h3>
                  <h4>
                    <u style={{ fontWeight: 800 }}>Propositions:</u>{" "}
                  </h4>
                  <div className="caderViewTest__response">
                    {recup.response.map((rep) => {
                      return (
                        <h4>
                          <span>
                            {" "}
                            {rep.content}{" "}
                            {rep.verify == true ? (
                              <FcCheckmark />
                            ) : (
                              <GrFormClose />
                            )}
                          </span>
                        </h4>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getStaticProps({ params }) {
  try {
    const recup = await axios.get(`api/school/lecon_test/${params}`);
    const recuperation = recup.data;
    return {
      props: { recuperation },
    };
  } catch (err) {
    return {
      props: {
        recuperation: [],
      },
    };
  }
}

export async function getStaticPaths() {
  const res = await axios.get(`api/school/program`);
  const posts = res.data;
  try {
    const paths = posts.map((post) => `/admin/cours/test/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}

export default TestPerso;
