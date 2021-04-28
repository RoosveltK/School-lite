import React from "react";
import LayoutT from "../../../components/LayoutT";
import ModalAddTest from "../../../components/user/teacher/ModalAddTest";
import { SiGoogleclassroom } from "react-icons/si";

class Tests extends React.Component {
  render() {
    return (
      <LayoutT title="Tests">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> CLASSE 5
          </div>
          <div id="triangle"></div>
        </div>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card centrer">
                <span>TESTS : QCM </span>
                <ModalAddTest />
              </div>
            </header>
            <section className="row">
              <div>
                <div className="cours">
                  <span>Test sur Les Amines </span>
                  <span> De quoi est consittuée une amine ? </span>
                  <span>Participants : 2</span>
                </div>
              </div>{" "}
              <div>
                <div className="cours">
                  <span>Test sur Les Amines </span>
                  <span> De quoi est consittuée une amine ? </span>
                  <span>Participants : 2</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Tests;
