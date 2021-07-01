import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Router from "next/router";

export default class ModalEditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      first_name: this.props.eleve.first_name,
      username: this.props.eleve.username,
      matricule: this.props.eleve.matricule,
      email: this.props.eleve.email,
      born_at: this.props.eleve.born_at,
      classe: this.props.eleve.classes,
      gender: this.props.eleve.gender,
      classeDispo: this.props.classeDispo,
      tabClasse: [],
      levels: [
        { value: "0", name: "Terminale" },
        { value: "1", name: "Première" },
        { value: "2", name: "Seconde" },
        { value: "3", name: "Troisième" },
        { value: "4", name: "Quatrième" },
        { value: "5", name: "Cinquième" },
        { value: "6", name: "Sixième" },
      ],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  componentDidMount() {
    let tab = [];

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

  handleModif = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      username: this.state.username,
      matricule: this.state.matricule,
      email: this.state.email,
      classes: [this.state.classe],
      born_at: this.state.born_at,
      gender: this.state.gender,
      departement: "stud",
    };
    axios
      .put(`api/user/${this.props.eleve.id}`, data)
      .then(() => {
        toast.success("Informations modifiées avec succès");
        setTimeout(() => Router.reload(), 2000);
        this.setState({ show: false });
      })
      .catch((err) => {
        if (err.response != undefined) toast.error(err.response.data.message);
        else
          toast.error(
            "Echec lors de la modification des informations de l'élève"
          );
      });
  };

  render() {
    return (
      <>
        <Dropdown.Item onClick={this.handleShow}>Editer</Dropdown.Item>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header closeButton className="color-titre-ajout">
            <Modal.Title className="colorTitre">
              Modification d'un Elève
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-form">
              <form>
                <div>
                  <label>Nom</label>
                  <input
                    type="text"
                    value={this.state.first_name}
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
                    value={this.state.username}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={this.state.email}
                    className="form-control"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div>
                  <label>Matricule</label>
                  <input
                    type="text"
                    value={this.state.matricule}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ matricule: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Date de naissance</label>
                  <input
                    type="date"
                    className="form-control"
                    value={this.state.born_at}
                    onChange={(e) => this.setState({ born_at: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Genre</label>
                  <select
                    className="form-select"
                    onChange={(e) => this.setState({ gender: e.target.value })}
                    value={this.state.gender}
                    required
                  >
                    <option value="M">masculin</option>
                    <option value="F">féminin</option>
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
                    <option value={null}>
                      Veuillez sélèctionner la classe--{" "}
                    </option>
                    {this.state.tabClasse.map((info) => (
                      <option key={info.id} value={info.id}>
                        {info.level}-{info.speciality}
                      </option>
                    ))}
                  </select>
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
              onClick={this.handleModif}
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
