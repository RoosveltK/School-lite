import React from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalCreateMatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      first_name: "",
      username: "",
      email: "",
      // phone: "",
      matricule: "",
      born_at: null,
      gender: "M",
      specialite: 1,
      classe: [],
      matiereE: null,
      classeDispo: props.classes,
      departementDispo: props.specialite,
      password: "admin",
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
      dep: parseInt(this.state.specialite),
      born_at: this.state.born_at,
      gender: this.state.gender,
      role: 2,
      classes: this.state.classe,
      password: this.state.password,
    };
    console.log(data);
    axios
      .post("api/user/", data)
      .then(() => toast.success("Enseignant crée avec succèss "))
      .catch((errr) => {
        console.log(errr);
        toast.error("Erreur lors de la création");
      });
    this.setState({ show: false });
  };

  render() {
    console.log(this.state.matiereE);
    return (
      <>
        <Dropdown.Item
          variant="dark"
          className="btn boutonE"
          onClick={this.handleShow}
        >
          NOUVEAU
        </Dropdown.Item>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title className="colorTitre">
              Ajout d'une Matière
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
                {/* <div>
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
                </div> */}
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
                    required
                  >
                    <option value={`M`}>masculin</option>
                    <option value={`F`}>féminin</option>
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
                    multiple
                  >
                    {this.state.classeDispo.map((salle) => (
                      <option value={salle.id}>
                        {salle.level.describe}- {salle.speciality.describe}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Spécialité</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ specialite: e.target.value })
                    }
                    required
                  >
                    {this.state.departementDispo.map((depart) => (
                      <option value={depart.id}>{depart.describe}</option>
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
