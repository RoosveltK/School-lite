import React from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default class ModalCreateClass extends React.Component {
  state = {
    show: false,
    level: null,
    speciality: null,
    levels: [
      { value: "0", name: "Terminale" },
      { value: "1", name: "Première" },
      { value: "2", name: "Seconde" },
      { value: "3", name: "Troisième" },
      { value: "4", name: "Quatrième" },
      { value: "5", name: "Cinquième" },
      { value: "6", name: "Sixième" },
    ],
    specialities: [
      { value: "C", name: "Mathématique" },
      { value: "D", name: "Science" },
      { value: "TI", name: "Informatique" },
      { value: "ESP", name: "Espagnol" },
      { value: "ALL", name: "Allemand" },
      { value: "N", name: "Aucune" },
    ],
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    if (this.state.level != null && this.state.speciality != null) {
      const data = {
        level: this.state.level,
        speciality: this.state.speciality,
      };
      axios
        .post("api/school/classe", data)
        .then(() => {
          toast.success("Classe crée avec succèss ");
          this.setState({ show: false });
        })
        .catch((errr) => {
          console.log(errr);
          toast.error("Erreur lors de la création");
        });
    }
  };

  render() {
    return (
      <>
        <Dropdown.Item
          variant="dark"
          className="btn boutonE"
          onClick={this.handleShow}
        >
          CLASSE
        </Dropdown.Item>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title className="colorTitre">Ajout d'une Classe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Niveau</label>
                <select
                  className="form-select"
                  onChange={(e) => this.setState({ level: e.target.value })}
                  required
                >
                  <option>-------------------</option>
                  {this.state.levels.map((lev) => (
                    <option value={lev.value}>{lev.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Spécialité</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    this.setState({ speciality: e.target.value })
                  }
                  required
                >
                  <option>-------------------</option>
                  {this.state.specialities.map((special) => (
                    <option value={special.value}>{special.name}</option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={this.handleClose}>
              Fermer
            </Button>
            <Button
              className="btn color-titre-ajout"
              onClick={this.handleCreate}
            >
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
