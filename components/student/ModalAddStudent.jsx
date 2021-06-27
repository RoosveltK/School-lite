import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalAddStudent extends React.Component {
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
      classe: null,
      matiereE: null,
      classeDispo: this.props.classes,
      password: "student",
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      username: this.state.username,
      email: this.state.email,
      matricule: this.state.matricule,
      born_at: this.state.born_at,
      gender: this.state.gender,
      role: 1,
      classes: [this.state.classe],
      password: this.state.password,
    };
    console.log(data);
    axios
      .post("api/user/", data)
      .then(() => {
        toast.success("Elève crée avec succèss ");
        setTimeout(() => Router.reload(), 2000);
      })
      .catch((errr) => {
        toast.error("Erreur lors de la création");
      });
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
            <Modal.Title className="colorTitre">Ajout d'un Elève</Modal.Title>
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
                    value={this.state.gender}
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
                    value={this.state.classe}
                    onChange={(e) =>
                      this.setState({
                        classe: e.target.value,
                      })
                    }
                  >
                    {this.state.classeDispo.map((salle) => (
                      <option value={salle.id}>
                        {salle.level.describe}- {salle.speciality.describe}
                      </option>
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
