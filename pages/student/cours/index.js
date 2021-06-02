import React, { Component } from "react";
import LayoutS from "../../../components/LayoutS";
import CadreCours from "../../../components/user/student/cadreCours";

class Cours extends Component {
  render() {
    return (
      <LayoutS title="Cours">
        <div className="cader">
          <CadreCours />
          <CadreCours />
          <CadreCours />
        </div>
      </LayoutS>
    );
  }
}
export default Cours;
