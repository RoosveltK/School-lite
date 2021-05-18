import React from "react";
import Layout from "../../../components/Layout";
import ModalCreateMatter from "../../../components/cours/ModalCreateMatter";
import ModalCreateSpeciality from "../../../components/cours/ModalCreateSpeciality";
import ModalCreateLevel from "../../../components/cours/ModalCreationLevel";
import ModalCreateClass from "../../../components/cours/ModalCreateClass";
import ModalSelect from "../../../components/cours/ModalSelect";
import CustomToggle from "../../../components/customToggle";
import axios from "axios";
import InfoCours from "../../../components/cours/infoCours";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { AiOutlineException } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";
import Loader from "../../../components/Loader/LoaderWait";
import Router from "next/router";
import Head from "next/head";

class Cours extends React.Component {
  state = {
    teachers: [],
    classe: [],
    special: [],
    niv: [],
    tests: [],
    matiere: null,
    niveau: null,
    specialite: null,
    user: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("access_token") != null) {
      this.setState({ user: 1 });
    } else {
      Router.push("/");
    }
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [2, 3] }],
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
        {this.state.user === 0 ? (
          <React.Fragment>
            <Head>
              <title>School online</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Cours">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span></span>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle}>
                        <button className="btn boutonT boutonE">
                          {" "}
                          AJOUTER &#x25bc;
                        </button>
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
                      className="table table-responsive table-striped  "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th width="10%">N°</th>
                          <th width="60%">Leçon</th>
                          <th width="10%">Activer</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                        <InfoCours />
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
}
export async function getServerSideProps() {
  try {
    const teacher = await axios.get(`api/user`);
    const classe = await axios.get(`api/school/classe`);
    const special = await axios.get(`api/school/speciality`);
    const niv = await axios.get(`api/school/level`);

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

export default Cours;
