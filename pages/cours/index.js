import React, { useState } from "react";
import Layout from "../../components/Layout";
import ModalAddTeacher from "../../components/teacher/ModalAddTeacher";
import ModalSelect from "../../components/ModalSelect";
import axios from "axios";
import { Table } from "react-bootstrap";
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
                  <span>TESTS({this.state.tests.length})</span>
                  <ModalAddTeacher title="Enseignant" />
                </div>
              </header>
              <section className="row">
                <ModalSelect recuperation={this.getInfo} />
                <table className="table dt-responsive nowrap">
                  <tbody>
                    <tr>
                      <th>Matière :</th>
                      <td>{this.state.matiere}</td>
                    </tr>
                    <tr>
                      <th>Spécialité :</th>
                      <td>{this.state.specialite}</td>
                    </tr>
                    <tr>
                      <th>Niveau :</th>
                      <td>{this.state.niveau}</td>
                    </tr>
                  </tbody>
                </table>
                <Table className="table dt-responsive nowrap">
                  <thead>
                    <th>N°</th>
                    <th>Leçon</th>
                    <th>Action</th>
                    <th>Activer</th>
                  </thead>
                  <tbody>
                    <InfoCours />
                  </tbody>
                </Table>
              </section>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default Tests;
