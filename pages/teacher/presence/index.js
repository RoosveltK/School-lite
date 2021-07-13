import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";

class Presence extends React.Component {
  render() {
    return (
      <LayoutT title="Presence">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> <span>Classe 5</span>
          </div>
          <div id="triangle"></div>
        </div>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card ">
                <span>LISTE DES ELEVES </span>
              </div>
            </header>
            <section className="row"></section>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Presence;
