import React from "react";
import Layout from "../../../components/Layout";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import { Button } from "react-bootstrap";

class Programme extends React.Component {
  state = {
    titre: "",
    description: "",
    dateLimite: "",
    duree: 0,
    temps: 0,
    matiere: "",
    matiereDispo: [],
  };
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
    axios
      .post(`api/school/program`, dataProgram)
      .then((res) => console.log("reussie"))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <>
        <Layout title="Programme">
          <div className="container-fluid">
            <div className="mainCard">
              <header className="row">
                <div className="panneauStyle">
                  <h3 className="form-group">
                    Matière :{" "}
                    <select
                      className="form-select"
                      value={this.state.matiere}
                      onChange={(e) =>
                        this.setState({ matiere: e.target.value })
                      }
                    >
                      {this.state.matiereDispo.map((mat) => (
                        <option value={mat.id}>{mat.name}</option>
                      ))}
                    </select>
                  </h3>
                </div>
              </header>
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
                      <Button variant="dark" className="btn boutonE ">
                        Soumettre
                      </Button>
                    </div>
                  </form>
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
    const matier = await axios.get(`api/user`);
    const matiere = matier.data;
    return { props: { matiere } };
  } catch (err) {
    console.log(err);
    return { props: { matiere: [] } };
  }
}

export default Programme;
