import React from "react";
import Layout from "../../../components/Layout";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ModalSelect from "../../../components/cours/ModalSelect";
import $ from "jquery";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../../../components/Loader/LoaderWait";
import Router from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";

class Programme extends React.Component {
  state = {
    titre: "",
    description: "",
    dateLimite: "",
    duree: 0,
    temps: 0,
    matiere: "",
    matiereDispo: [],
    matiereP: null,
    niveauP: null,
    specialiteP: null,
    user: null,
  };

  componentDidMount() {
    axios
      .get(`api/user/currentuser`)
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => Router.push("/"));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const dataProgram = {
      title: this.state.titre,
      describe: this.state.description,
      limit_day: this.state.dateLimite,
      begin_time: this.state.temps,
      duration: this.state.duree,
      matter: 1,
    };
    console.log(dataProgram);
    axios
      .post(`api/school/program`, dataProgram)
      .then((res) => toast.success("Programme mis à jour"))
      .catch((err) =>
        toast.error("Erreur lors de la mise à jour du programme")
      );
  };
  getInfo = (matiere, niveau, specialite) => {
    this.setState({ matiereP: matiere });
    this.setState({ niveauP: niveau });
    this.setState({ specialiteP: specialite });
  };
  render() {
    return (
      <>
        {this.state.user === null ? (
          <React.Fragment>
            <Head>
              <title>School online</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Programme">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="panneauStyle">
                    <h3 className="form-group">
                      Matière : {this.state.matiereP}
                    </h3>
                  </div>
                </header>
                <ModalSelect recuperation={this.getInfo} />
                <section className="row">
                  <div className="col-12 content-card">
                    <form onSubmit={this.handleSubmit} className="formPorgram">
                      <div className="form-group">
                        <label>Titre :</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Entrez le titre"
                          onChange={(e) =>
                            this.setState({ titre: e.target.value })
                          }
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) =>
                              this.setState({ dateLimite: e.target.value })
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Durée"
                            onChange={(e) =>
                              this.setState({ duree: e.target.value })
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Heure de début"
                            onChange={(e) =>
                              this.setState({ temps: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description:</label>
                        <textarea
                          className="form-control"
                          onChange={(e) =>
                            this.setState({ description: e.target.value })
                          }
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="col-12 header-card">
                        <span></span>
                        <Button
                          variant="dark"
                          type="submit"
                          className="btn boutonE "
                        >
                          Soumettre
                        </Button>
                      </div>
                    </form>
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

export default Programme;
