import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Router from "next/router";

export default class ModalEditTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      show: false,
      first_name: this.props.enseignant.first_name,
      username: this.props.enseignant.username,
      matricule: this.props.enseignant.matricule,
      email: this.props.enseignant.email,
      born_at: this.props.enseignant.born_at,
      classe: this.props.enseignant.classes,
      gender: this.props.enseignant.gender,
      classeDispo: this.props.classe,
      departement: this.props.enseignant.departement,
      departementDispo: [],
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

  handleModif = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const data = {
      first_name: this.state.first_name,
      username: this.state.username,
      matricule: this.state.matricule,
      email: this.state.email,
      classes: this.state.classe,
      departement: this.state.departement,
      born_at: this.state.born_at,
    };
    axios
      .put(`api/user/${this.props.enseignant.id}`, data)
      .then(() => {
        toast.success("Informations modifiés avec succès");
        setTimeout(() => Router.reload(), 2000);
        this.setState({ show: false });
      })
      .catch((err) => {
        toast.error(
          "Echec lors de la modification des informations de l'enseignant"
        );
        this.setState({ isLoading: false });
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
              Modification d'un Enseignant
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
                  <label>Email</label>
                  <input
                    type="email"
                    value={this.state.email}
                    className="form-control"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div>
                  <label>Classe</label>
                  <select
                    className="form-select"
                    value={this.state.classe}
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
                    {this.state.tabClasse.map((info) => (
                      <option key={info.id} value={info.id}>
                        {info.level}-{info.speciality}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Département</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      this.setState({ specialite: e.target.value })
                    }
                    required
                    value={this.state.departement}
                  >
                    <option>
                      Veuillez sélectionner le département de l'enseignant
                    </option>
                    {this.state.departementDispo.map((depart) => (
                      <option value={depart.value}>{depart.name}</option>
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

            {this.state.isLoading == true ? (
              <Button
                variant="primary"
                type="submit"
                disabled
                className="color-titre-ajout"
              >
                Patientez...
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleModif}
                className="color-titre-ajout"
              >
                Valider
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
