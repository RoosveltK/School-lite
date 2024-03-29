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
    isLoading: false,
    titre: "",
    titre1: "",
    description: "",
    dateLimite: "",
    duree: 0,
    temps: 0,
    matiere: null,
    user: 0,
    classe: null,
  };

  componentDidMount() {
    if (localStorage.getItem("access_token") != null) {
      this.setState({ user: 1 });
    } else {
      Router.push("/");
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.description != "" &&
      this.state.titre != "" &&
      this.state.dateLimite != "" &&
      this.state.temps != 0 &&
      this.state.matiere != null &&
      this.state.duree != 0 &&
      this.state.duree >= 3
    ) {
      this.setState({ isLoading: true });

      const dataProgram = {
        title: this.state.titre,
        describe: this.state.description,
        limit_day: this.state.dateLimite,
        begin_time: this.state.temps,
        duration: parseInt(this.state.duree),
        matter: this.state.matiere.id,
      };
      axios
        .post(`api/school/program`, dataProgram)
        .then(() => {
          toast.success(
            `Programme de ${this.state.classe.level}-${this.state.classe.speciality} mis à jour`
          );
          this.setState({
            titre: "",
            description: "",
            dateLimite: "",
            duree: 0,
            temps: 0,
            isLoading: false,
          });
        })
        .catch((err) => {
          toast.error(
            "Erreur lors de la mise à jour du programme, cette leçon éxiste  propablement déja"
          );
          this.setState({ isLoading: false });
        });
    } else toast.error("Les  données entrées  sont erronées");
  };
  getInfo = (classes, matiere) => {
    this.setState({
      matiere: matiere,
    });
    this.setState({
      classe: classes,
    });
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
          <Layout title="Programme">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="panneauStyle">
                    <h3 className="form-group"></h3>
                  </div>
                </header>
                <ModalSelect
                  getChapterAndClass={this.getInfo}
                  matiereNiveau={this.props.matter}
                  classes={this.props.classes}
                />
                <section className="row">
                  <div className="col-12 content-card">
                    <form onSubmit={this.handleSubmit} className="formPorgram">
                      <div className="form-group">
                        <label>Titre :</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Entrez le titre"
                          value={this.state.titre}
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
                            value={this.state.dateLimite}
                            onChange={(e) =>
                              this.setState({ dateLimite: e.target.value })
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Durée: 3 "
                            // value={this.state.duree}
                            onChange={(e) =>
                              this.setState({ duree: e.target.value })
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="time"
                            className="form-control"
                            placeholder="Heure de début"
                            value={this.state.temps}
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
                          value={this.state.description}
                          onChange={(e) =>
                            this.setState({ description: e.target.value })
                          }
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="col-12 header-card">
                        <span></span>
                        {this.state.isLoading == true ? (
                          <Button
                            variant="dark"
                            type="submit"
                            className="btn boutonE "
                            disabled
                          >
                            Patientez...
                          </Button>
                        ) : (
                          <Button
                            variant="dark"
                            type="submit"
                            className="btn boutonE "
                          >
                            Soumettre
                          </Button>
                        )}
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
    const mat = await axios.get(`api/school/matter`);
    const clas = await axios.get(`api/school/classe`);

    const classes = clas.data;
    const matter = mat.data;

    return { props: { matter, classes } };
  } catch (err) {
    console.log(err);
    return { props: { matter: [], classes: [] } };
  }
}

export default Programme;
