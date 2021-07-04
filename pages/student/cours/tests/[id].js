import React from "react";
import LayoutS from "../../../../components/LayoutS";
import Quizz from "./Quizz";
import axios from "axios";

const Test = ({ lecon, quiz }) => {
  return (
    <LayoutS title="Test">
      <div className="container-fluid">
        <div className="mainCard">
          {quiz == "" ? (
            <div className="textCours text-secondary">
              TEST PAS ENCORE DISPONIBLE
            </div>
          ) : (
            <Quizz quiz={quiz} lecon={lecon} />
          )}
        </div>
      </div>
    </LayoutS>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`api/school/lecon_test/${params.id}`);
    const les = await axios.get(`api/school/lecon`);
    let lecon = null;
    const quiz = res.data;

    les.data.forEach((element) => {
      if (element.program == params.id) lecon = element;
    });

    return { props: { quiz, lecon } };
  } catch (err) {
    console.log(err);
    return { props: { quiz: "", lecon: "" } };
  }
}

export default Test;
