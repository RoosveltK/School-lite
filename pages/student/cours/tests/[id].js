import React from "react";
import LayoutS from "../../../../components/LayoutS";
import Quizz from "./Quizz";
import axios from "axios";

const Test = ({ program, quiz }) => {
  return (
    <LayoutS title="Test">
      <div className="container-fluid">
        <div className="mainCard">
          <Quizz quiz={quiz} />
        </div>
      </div>
    </LayoutS>
  );
};

export async function getStaticProps({ params }) {
  try {
    const prog = await axios.get(`api/school/program/${params.id}`);
    const res = await axios.get(`api/school/lecon_test/${params.id}`);

    const quiz = res.data;
    const program = prog.data;

    return { props: { quiz, program } };
  } catch (err) {
    console.log(err);
    return { props: { quiz: "", program: "" } };
  }
}

export async function getStaticPaths() {
  const res = await axios.get(`api/school/program`);
  const posts = res.data;
  try {
    const paths = posts.map((post) => `/student/cours/tests/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}
export default Test;
