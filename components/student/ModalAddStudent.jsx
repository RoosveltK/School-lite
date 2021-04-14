import React from "react";
import { Modal, Button } from "react-bootstrap";
import Router from "next/router";

export default class ModalAddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      matricule: "",
      born_at: null,
      gender: "",
      username: "",
      role: "",
      classe: [],
      specialite: null,
      password: "admin",
      imageProfil: null,
      classeDispo: [],
      specialiteDispo: [],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      matricule: this.state.matricule,
      email: this.state.email,
      specialite: this.state.specialite,
      classe: this.state.classe,
      image: this.state.imageProfil,
      born_at: this.state.born_at,
    };
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
          <Modal.Header closeButton className="color-titre-ajout">
            <Modal.Title className="colorTitre">{`Ajout d'un ${this.props.title}`}</Modal.Title>
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
                    required
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
                  <label>Date de naissance</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => this.setState({ born_at: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
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
                </div>
                <div>
                  <label>Classe</label>
                  <select
                    className="form-control"
                    onChange={(e) => this.setState({ classe: e.target.value })}
                    defaultValue={this.state.classe}
                  >
                    {this.state.classeDispo.map((salle) => {
                      <option value={salle.id}>{salle.name}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label>Spécialité</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ specialite: e.target.value })
                    }
                    defaultValue={this.state.specialite}
                  >
                    {this.state.specialiteDispo.map((salle) => {
                      <option value={salle.id}>{salle.name}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label>Photo de profile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ imageProfil: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fermer
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={this.handleCreate}
              className="color-titre-ajout"
            >
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
