import React from "react";
import LayoutS from "../../../components/LayoutS";
import Quizz from "./Quizz";

class Test extends React.Component {
  render() {
    return (
      <LayoutS>
        <div className="container-fluid">
          <div className="mainCard">
            <Quizz />
          </div>
        </div>
      </LayoutS>
    );
  }
}
export default Test;
