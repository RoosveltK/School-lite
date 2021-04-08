import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

export default class ModalEditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      first_name: this.props.enseignant.first_name,
      last_name: this.props.enseignant.last_name,
      matricule: this.props.enseignant.matricule,
      email: this.props.enseignant.email,
      born_at: this.props.enseignant.born_at,
      classe: this.props.enseignant.classe,
      specialite: this.props.enseignant.specialite,
      imageProfil: this.props.enseignant.imageProfil,
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleModif = async (event) => {
    event.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      matricule: this.state.matricule,
      email: this.state.email,
      classe: this.state.classe,
      specialite: this.state.specialite,
      imageProfil: this.state.imageProfil,
      born_at: this.state.born_at,
    };
    axios
      .put(`surveillance/supervisor/${this.props.enseignant.id}`, data)
      .then(() => {
        toast.success(
          "Informations modifiés avec succès, veuillez recharchez la page"
        );
      })
      .catch(() => {
        toast.error(
          "Erreur lors de la modification des informations de l'enseignant"
        );
      });
    this.setState({ show: false });
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
            <Modal.Title className="colorTitre">{`Modification d'un ${this.props.title}`}</Modal.Title>
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
                    value={this.state.last_name}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ last_name: e.target.value })
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
                    className="form-control"
                    onChange={(e) => this.setState({ classe: e.target.value })}
                  >
                    {this.state.salle.map((salle) => {
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
                    {this.state.specialite.map((salle) => {
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
