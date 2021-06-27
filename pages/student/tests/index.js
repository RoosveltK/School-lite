import React from "react";
import LayoutS from "../../../components/LayoutS";
import Quizz from "./Quizz";

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
export default Test;
