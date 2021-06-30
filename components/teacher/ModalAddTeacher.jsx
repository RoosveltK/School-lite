import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalAddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      first_name: "",
      username: "",
      email: "",
      matricule: "",
      born_at: null,
      gender: "M",
      specialite: 1,
      classe: [],
      matiereE: null,
      classeDispo: this.props.classes,
      departementDispo: this.props.specialite,
      password: "admin",
      tableClasse: [],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  componentDidMount() {
    let arrayC = [];
    this.state.classeDispo.map((salle) => {
      this.props.specialite.forEach((special) => {
        this.props.level.map((lev) => {
          if (salle.speciality == special.id && salle.level == lev.id) {
            const info = {
              id: salle.id,
              describe: lev.describe,
              letter: special.letter,
            };
            arrayC.push(info);
            this.setState({ tableClasse: arrayC });
          }
        });
      });
    });
  }

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      username: this.state.username,
      email: this.state.email,
      matricule: this.state.matricule,
      dep: parseInt(this.state.specialite),
      born_at: this.state.born_at,
      gender: this.state.gender,
      role: 2,
      classes: this.state.classe,
      password: this.state.password,
    };
    axios
      .post("api/user/", data)
      .then(() => {
        toast.success("Enseignant crée avec succèss ");
        setTimeout(() => Router.reload(), 2000);
        this.setState({ show: false });
      })
      .catch((err) => {
        if (err.response != undefined) toast.error(err.response.data.message);
        else toast.error("Echec lors de la création l'enseignant");
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
              <form onSubmit={this.handleCreate}>
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
                    {this.state.tableClasse.map((info) => {
                      return (
                        <option key={info.id} value={info.id}>
                          {info.describe}- {info.letter}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label>Spécialité</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      this.setState({ specialite: e.target.value })
                    }
                    required
                  >
                    {this.state.departementDispo.map((depart) => (
                      <option value={depart.id}>{depart.letter}</option>
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
                  <button
                    type="submit"
                    onClick={this.handleCreate}
                    className="btn color-titre-ajout"
                  >
                    Valider
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
