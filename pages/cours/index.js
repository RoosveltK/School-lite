import React, { useState } from "react";
import Layout from "../../components/Layout";
import ModalAddTeacher from "../../components/teacher/ModalAddTeacher";
import ModalSelect from "../../components/ModalSelect";
import axios from "axios";
import InfoCours from "../../components/infoCours";

class Tests extends React.Component {
  state = {
    tests: [],
    matiere: null,
    niveau: null,
    specialite: null,
  };

  getInfo = (matiere, niveau, specialite) => {
    this.setState({ matiere: matiere });
    this.setState({ niveau: niveau });
    this.setState({ specialite: specialite });
  };
  render() {
    return (
      <>
        <Layout title="Tests">
          <div className="container-fluid">
            <div className="mainCard">
              <header className="row">
                <div className="col-12 header-card">
                  <span></span>
                  <ModalAddTeacher title="Enseignant" />
                </div>
                <div className="col-12 titreCours">
                  Matière :{this.state.matiere} <br />
                </div>
                <div className="col-4 titreCours">
                  Spécialité :{this.state.specialite} <br />
                </div>{" "}
                <div className="col-4 titreCours">
                  Niveau :{this.state.niveau} <br />
                </div>
              </header>
              <ModalSelect recuperation={this.getInfo} />
              <section className="row">
                <div className="col-12 content-card">
                  <table
                    id="datatable"
                    className="table-responsive-sm nowrap "
                    style={{
                      borderCollapse: "collapse",
                      borderSpacing: 0,
                      width: "100%",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Leçon</th>
                        <th>Action</th>
                        <th>Activer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <InfoCours />
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default Tests;
