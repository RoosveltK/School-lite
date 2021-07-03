import React from "react";
import LayoutS from "../../../../components/LayoutS";
import Quizz from "./Quizz";
import axios from "axios";

const Test = () => {
  return (
    <LayoutS title="Test">
      <div className="container-fluid">
        <div className="mainCard">
          <Quizz />
        </div>
      </div>
    </LayoutS>
  );
};

export async function getStaticProps({ params }) {
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

export async function getStaticPaths() {
  const res = await axios.get(`api/school/lecon`);
  const posts = res.data;
  try {
    const paths = posts.map((post) => `/student/cours/tests/${post.id}`);
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
  }
}
export default Test;
