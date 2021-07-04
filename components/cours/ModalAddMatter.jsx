import React from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
const matiere = [
  { value: "math", name: "Mathématique" },
  { value: "phy", name: "Physique" },
  { value: "chim", name: "Chimie" },
  { value: "hist", name: "Histoire" },
  { value: "geo", name: "Géographie" },
  { value: "en", name: "Anglais" },
  { value: "fr", name: "Français" },
  { value: "svt", name: "Science" },
  { value: "ecm", name: "ECM" },
  { value: "eps", name: "Sport" },
  { value: "inf", name: "Informatique" },
];

const levels = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];

export default class ModalAddMatter extends React.Component {
  state = {
    show: false,
    clas: null,
    coef: null,
    mat: null,
    classes: [],
  };

  componentDidMount() {
    let tab = [];
    axios.get(`api/school/classe`).then((res) => {
      this.setState({ classes: res.data });
      this.state.classes.forEach((elt) => {
        levels.forEach((element) => {
          if (elt.level == element.value || elt.level == element.name) {
            tab.push({
              id: elt.id,
              name: element.name,
              speciality: elt.speciality,
            });
          }
        });
      });
      this.setState({ classes: tab });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show != this.state.show) {
      let tab = [];
      axios.get(`api/school/classe`).then((res) => {
        this.setState({ classes: res.data });
        this.state.classes.forEach((elt) => {
          levels.forEach((element) => {
            if (elt.level == element.value || elt.level == element.name) {
              tab.push({
                id: elt.id,
                name: element.name,
                speciality: elt.speciality,
              });
            }
          });
        });
        this.setState({ classes: tab });
      });
    }
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCreate = async (event) => {
    event.preventDefault();

    const data = {
      classe: this.state.clas,
      credit: this.state.coef,
      matter: this.state.mat,
    };
    axios
      .post("api/school/matter", data)
      .then(() => {
        toast.success("Classe crée avec succèss ");
        this.setState({ show: false });
      })
      .catch((errr) => {
        console.log(errr);
        toast.error("Erreur lors de la création");
      });
  };

  render() {
    return (
      <>
        <Dropdown.Item
          variant="dark"
          className="btn boutonE"
          onClick={this.handleShow}
        >
          MATIERE
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
              Attribution de matière
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Classe</label>
                <select
                  className="form-select"
                  onChange={(e) => this.setState({ clas: e.target.value })}
                  required
                >
                  <option>-------------------</option>
                  {this.state.classes.map((lev) => (
                    <option value={lev.id}>
                      {lev.name}-{lev.speciality}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Matière</label>
                <select
                  className="form-select"
                  onChange={(e) => this.setState({ mat: e.target.value })}
                  required
                >
                  <option>-------------------</option>
                  {matiere.map((special) => (
                    <option value={special.value}>{special.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Coef</label>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) =>
                    this.setState({ coef: parseInt(e.target.value) })
                  }
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
//
