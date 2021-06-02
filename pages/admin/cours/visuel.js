import axios from "axios";
import React from "react";
import Layout from "../../../components/Layout";
import { FcCheckmark } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";

const VisuelTest = ({ recuperation }) => {
  return (
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
                  {recup.response.map((rep, index) => {
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
  );
};

export async function getStaticProps() {
  try {
    const recup = await axios.get(`api/school/lecon_test/2`);
    let recuperation = recup.data;
    return {
      props: { recuperation },
    };
  } catch {
    return {
      props: {
        recuperation: [],
      },
    };
  }
}
export default VisuelTest;
