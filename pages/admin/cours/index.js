import React, { useState } from "react";
import Layout from "../../../components/Layout";
import ModalCreateMatter from "../../../components/cours/ModalCreateMatter";
import ModalCreateSpeciality from "../../../components/cours/ModalCreateSpeciality";
import ModalCreateLevel from "../../../components/cours/ModalCreationLevel";
import ModalCreateClass from "../../../components/cours/ModalCreateClass";
import ModalSelect from "../../../components/cours/ModalSelect";
import CustomToggle from "../../../components/customToggle";
import axiosInstance from "../../axios";
import InfoCours from "../../../components/cours/infoCours";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { AiOutlineException } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";

class Tests extends React.Component {
  state = {
    teachers:[],
    classe:[],
    special:[],
    niv:[],
    tests: [],
    matiere: null,
    niveau: null,
    specialite: null,
  };

  componentDidMount() {
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [0, 3, 5] }],
      });
    });
  }
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
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                      <button className="btn boutonT"> AJOUTER &#x25bc;</button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="options">
                      <ModalCreateSpeciality />
                      <Dropdown.Divider />
                      <ModalCreateLevel />
                      <Dropdown.Divider />
                      <ModalCreateClass
                        niveau={this.props.niveau}
                        specialite={this.props.specialite}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
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
export async function getServerSideProps() {
  try {
    const teacher = await axiosInstance.get(`user`);
    const classe = await axiosInstance.get(`school/classe`);
    const special = await axiosInstance.get(`school/speciality`);
    const niv = await axiosInstance.get(`school/level`);
    // const users= await axiosInstance.get(`user:`)
    const specialite = special.data;
    const clas = classe.data;
    const teachers = teacher.data;
    const niveau = niv.data;
    return { props: { teachers, clas, specialite, niveau } };
  } catch (err) {
    console.log(err);
    return { props: { teachers: [], clas: [], specialite: [], niveau: [] } };
  }
}

export default Tests;
