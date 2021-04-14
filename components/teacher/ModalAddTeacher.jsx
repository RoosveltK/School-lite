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
      last_name: "",
      email: "",
      phone: "",
      matricule: "",
      born_at: null,
      gender: "masculin",
      classe: [],
      matiereE: null,
      imageProfil: null,
      classeDispo: [],
      matiereEDispo: [],
      password: "admin",
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone,
      matricule: this.state.matricule,
      born_at: this.state.born_at,
      gender: this.state.gender,
      matiereE: this.state.matiereE,
      role: 1,
      classe: this.state.classe,
      image: this.state.imageProfil,
    };
    axios
      .post("/users/signup", data)
      .then(() => toast.success("Enseignant crée avec succèss "))
      .catch(() => toast.error("Erreur lors de la création"));
    this.setState({ show: false });
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
            <Modal.Title className="colorTitre">{`Ajout d'un ${this.props.title}`}</Modal.Title>
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
                      this.setState({ last_name: e.target.value })
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
                  <label>Numéro de téléphone</label>
                  <input
                    type="tel"
                    maxLength="9"
                    minLength="9"
                    pattern="[0-9]{9}"
                    className="form-control"
                    placeholder=""
                    onChange={(e) => this.setState({ phone: e.target.value })}
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
                    className="form-control"
                    onChange={(e) => this.setState({ gender: e.target.value })}
                    value={this.state.gender}
                    required
                  >
                    <option value="masculin">masculin</option>
                    <option value="feminin">féminin</option>
                  </select>
                </div>
                <div>
                  <label>Matière</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ matiereE: e.target.value })
                    }
                    value={this.state.matiere}
                  >
                    {this.state.matiereEDispo.map((mat) => {
                      <option value={mat.id}>{mat.name}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label>Classe</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      this.setState({
                        classe: Array.from(e.target.selectedOptions).map(
                          (option) => option.value
                        ),
                      })
                    }
                    value={this.state.classe}
                    multiple
                  >
                    {this.state.classeDispo.map((salle) => {
                      <option value={salle.id}>{salle.name}</option>;
                    })}
                  </select>
                </div>
                {/* <div>
                  <label>Photo de profile</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ imageProfil: e.target.value })
                    }
                  />
                </div> */}
                <div className="btnModal">
                  <button
                    className="btn btn-secondary"
                    onClick={this.handleClose}
                  >
                    Fermer
                  </button>
                  <button type="submit" className="btn color-titre-ajout">
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