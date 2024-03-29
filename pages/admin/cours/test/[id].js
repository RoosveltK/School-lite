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
            {recuperation.length == 0 ? (
              <div className="textCours text-secondary">
                TEST PAS ENCORE DISPONIBLE
              </div>
            ) : (
              <React.Fragment>
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
                                &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp;
                                {rep.verify == true ? (
                                  <FcCheckmark />
                                ) : (
                                  <GrFormClose />
                                )}{" "}
                                <span>
                                  {rep.content}
                                  <br />
                                </span>
                              </span>
                            </h4>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const recup = await axios.get(`api/school/lecon_test/${params.id}`);
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

export default TestPerso;
