import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalAddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      show: false,
      first_name: "",
      username: "",
      email: "",
      matricule: "",
      born_at: null,
      gender: "M",
      specialite: "",
      classe: [],
      matiereE: null,
      classeDispo: this.props.classes,
      departementDispo: [],
      password: "",
      levels: [
        { value: "0", name: "Terminale" },
        { value: "1", name: "Première" },
        { value: "2", name: "Seconde" },
        { value: "3", name: "Troisième" },
        { value: "4", name: "Quatrième" },
        { value: "5", name: "Cinquième" },
        { value: "6", name: "Sixième" },
      ],
      tabClasse: [],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  componentDidMount() {
    let tab = [];
    this.state.departementDispo = JSON.parse(
      localStorage.getItem("departements")
    );

    this.state.classeDispo.map((infos) => {
      this.state.levels.map((lev) => {
        if (lev.value == infos.level) {
          const info = {
            id: infos.id,
            level: lev.name,
            speciality: infos.speciality,
          };
          tab.push(info);
          this.setState({ tabClasse: tab });
        }
      });
    });
  }

  handleCreate = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const data = {
      first_name: this.state.first_name,
      username: this.state.username,
      email: this.state.email,
      matricule: this.state.matricule,
      departement: this.state.specialite,
      born_at: this.state.born_at,
      gender: this.state.gender,
      role: "teach",
      classes: this.state.classe,
      password: this.state.first_name.toLowerCase() + "12345",
    };
    axios
      .post("api/user/", data)
      .then(() => {
        toast.success("Enseignant crée avec succèss ");
        setTimeout(() => Router.reload(), 2000);
        this.setState({ show: false });
      })
      .catch((err) => {
        toast.error("Echec lors de la création l'enseignant");
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <>
        <Button
          variant="dark"
          className="btn boutonE"
          onClick={this.handleShow}
        >
          NOUVEAU
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title className="colorTitre">
              Ajout d'un Enseignant
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-form">
              <form>
                <div>
                  <label>Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder=""
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Matricule</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ matricule: e.target.value })
                    }
                    required
                  />

                  <div>
                    <label>Date de naissance</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ born_at: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Genre</label>
                  <select
                    className="form-select"
                    onChange={(e) => this.setState({ gender: e.target.value })}
                    required
                  >
                    <option value={`M`}>masculin</option>
                    <option value={`F`}>féminin</option>
                  </select>
                </div>

                <div>
                  <label>Classe</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      this.setState({
                        classe: Array.from(e.target.selectedOptions).map(
                          (option) => option.value
                        ),
                      })
                    }
                    multiple
                  >
                    {this.state.tabClasse.map((info) => (
                      <option key={info.id} value={info.id}>
                        {info.level}-{info.speciality}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Départements</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      this.setState({ specialite: e.target.value })
                    }
                    required
                  >
                    <option>Sélectionner le département de l'enseignant</option>
                    {this.state.departementDispo.map((depart) => (
                      <option value={depart.value}>{depart.name}</option>
                    ))}
                  </select>
                </div>
                <div className="btnModal">
                  <button
                    className="btn btn-secondary"
                    onClick={this.handleClose}
                  >
                    Fermer
                  </button>
                  {this.state.isLoading == true ? (
                    <button
                      type="submit"
                      disabled
                      className="btn color-titre-ajout"
                    >
                      Patientez ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={this.handleCreate}
                      className="btn color-titre-ajout"
                    >
                      Valider
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
