import React from "react";
import Layout from "../../../components/Layout";
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
import { dataCours } from "../../../json/dataCours";

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
    user: 1,
    programme: [],
  };

  componentDidMount() {
    // if (localStorage.getItem("access_token") != null) {
    //   this.setState({ user: 1 });
    // } else {
    //   Router.push("/");
    // }
    // $(document).ready(function () {
    //   $("#datatable").DataTable({
    //     searching: true,
    //     paging: false,
    //     info: false,
    //     columnDefs: [{ orderable: false, targets: [2, 3] }],
    //   });
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.matiere !== prevState.matiere) {
      axios
        .get(`api/school/program_by_matter/${this.state.matiere.id}`)
        .then((res) => {
          this.setState({ programme: res.data });
        })
        .catch((err) => console.log(err));
    }
  }
  getInfo = (matiere) => {
    this.setState({ matiere: matiere });
  };
  render() {
    return (
      <>
        {this.state.user === 0 ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
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
                        <ModalCreateClass />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  {/* <div className="col-12 titreCours">
                    Matière :{this.state.matiere} <br />
                  </div> */}
                  {/* <div className="col-4 titreCours">
                    Spécialité :
                    {this.state.matiere === null
                      ? null
                      : this.state.matiere.classe.speciality.describe}{" "}
                    <br />
                  </div>{" "}
                  <div className="col-4 titreCours">
                    Niveau :
                    {this.state.matiere === null
                      ? null
                      : this.state.matiere.classe.level.describe}{" "}
                    <br />
                  </div> */}
                </header>
                <ModalSelect
                  recuperation={this.getInfo}
                  matiereNiveau={this.props.matter}
                />
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
                          <th width="50%">Leçon</th>
                          <th width="10%">Date Début</th>
                          <th width="10%">Date Limite</th>
                          <th width="10%" class="centerContent">
                            Activer
                          </th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataCours.map((program) => {
                          return (
                            <InfoCours dataCours={program} key={program.id} />
                          );
                        })}
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
    const classe = await axios.get(`api/school/classe`);
    const lecon = await axios.get(`api/school/lecon`);
    const mat = await axios.get(`api/school/matter`);

    const matter = mat.data;
    const clas = classe.data;
    const cours = lecon.data;
    return { props: { clas, cours, matter } };
  } catch (err) {
    console.log(err);
    return {
      props: {
        clas: [],
        cours: [],
        matter: [],
      },
    };
  }
}

export default Cours;
