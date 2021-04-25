import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";

class Evaluation extends React.Component {
  render() {
    return (
      <LayoutT title="Evaluation">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> CLASSE 5
          </div>
          <div id="triangle"></div>
          {/* <span className="centrer">Matiere: </span> */}
        </div>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card centrer">
                <span>TITRE: INTRODUCTION AUX T.I.C</span>
              </div>
            </header>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Evaluation;
