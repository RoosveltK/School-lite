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
      serie: "",
      describe: "",
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      num: parseInt(this.state.serie),
      describe: this.state.describe,
    };
    console.log(data);
    axios
      .post("api/school/level", data)
      .then(() => toast.success("Niveau crée avec succèss "))
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
          NIVEAU
        </Dropdown.Item>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title className="colorTitre">Ajout d'une niveau</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Niveau</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" 2 "
                  onChange={(e) => this.setState({ serie: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="5ième"
                  onChange={(e) => this.setState({ describe: e.target.value })}
                  required
                />
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
