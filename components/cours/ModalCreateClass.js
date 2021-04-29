import React from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalCreateSpeciality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      level: "",
      speciality: [],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      level: parseInt(this.state.level),
      speciality: this.state.speciality,
    };
    console.log(data);
    axios
      .post("api/school/classe", data)
      .then(() => toast.success("Classe crée avec succèss "))
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
                  {this.props.niveau.map((lev) => (
                    <option value={lev.id}>{lev.describe}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Spécialité</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    this.setState({
                      speciality: Array.from(e.target.selectedOptions).map(
                        (option) => option.value
                      ),
                    })
                  }
                  multiple
                  required
                >
                  {this.props.specialite.map((special) => (
                    <option value={special.id}>{special.describe}</option>
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
