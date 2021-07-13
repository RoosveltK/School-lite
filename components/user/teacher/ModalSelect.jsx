import React from "react";
import { Modal, Button } from "react-bootstrap";

const classeDispo = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];
export default class ModalSelect extends React.Component {
  state = {
    show: true,
    classe: [],
    selectClass: null,
  };

  componentDidMount() {
    const tab = [...this.props.classes];

    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });
  }

  handleClose = () => this.setState({ show: false });

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.selectClass != null) {
      this.props.getChapterAndClass(JSON.parse(this.state.selectClass));
      this.handleClose();
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="modalSuppression"
          backdrop="static"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title>Selection de la Classe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="niveau">Classe</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    this.setState({ selectClass: e.target.value })
                  }
                  id="niveau"
                >
                  <option>---------------------</option>
                  {this.state.classe.map((clas) => (
                    <option key={clas.id} value={JSON.stringify(clas)}>
                      {clas.level}-{clas.speciality}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <Modal.Footer>
              <Button
                className="btn color-titre-ajout"
                onClick={this.handleSubmit}
              >
                Soumettre
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
