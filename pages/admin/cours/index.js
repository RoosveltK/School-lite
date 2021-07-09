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
import ModalAddMatter from "../../../components/cours/ModalAddMatter";

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
    programme: [],
    chapitre: null,
    classe: null,
  };

  componentDidMount() {
    if (localStorage.getItem("access_token") != null)
      this.setState({ user: 1 });
    else Router.push("/");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.matiere != this.state.matiere) {
      axios
        .get(`api/school/program_by_matter/${this.state.matiere.id}`)
        .then((res) => {
          this.setState({ programme: res.data });
        })
        .catch((err) => console.log(err));
    }
  }
  getInfo = (classes, matiere) => {
    this.setState({ classe: classes });
    this.setState({ matiere: matiere });
  };
  render() {
    return (
      <>
        {this.state.user == 0 ? (
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
                        <ModalAddMatter />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-4 titreCours">
                    Classe:
                    {this.state.classe == null
                      ? null
                      : `${this.state.classe.level}-${this.state.classe.speciality}`}{" "}
                    <br />
                  </div>{" "}
                  <div className="col-4 titreCours">
                    Matière:
                    {this.state.matiere == null
                      ? null
                      : this.state.matiere.matter}{" "}
                    <br />
                  </div>
                </header>
                <ModalSelect
                  classes={this.props.clas}
                  getChapterAndClass={this.getInfo}
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
                          <th width="10%" className="centerContent">
                            Activer
                          </th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.programme.map((program) => {
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
