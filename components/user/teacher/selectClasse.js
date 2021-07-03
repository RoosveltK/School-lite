import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
const classeDispo = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];
export default class ModalSelectClasse extends React.Component {
  state = {
    show: true,
    classe: [],
    matiere: [],
    program: [],
    selectClass: null,
    selectMatter: null,
    selectProgram: null,
  };

  componentDidMount() {
    const infoUser = JSON.parse(localStorage.getItem("teacherInfo"));

    let tab = infoUser.classes;
    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectClass != this.state.selectClass) {
      let ids = JSON.parse(this.state.selectClass);
      axios
        .get(`api/school/classe/matter/${ids.id}`)
        .then((res) => {
          this.setState({ matiere: res.data });
        })
        .catch((err) => console.log(err));
    }

    if (prevState.selectMatter != this.state.selectMatter) {
      axios
        .get(`api/school/program_by_matter/${this.state.selectMatter}`)
        .then((res) => {
          this.setState({ program: res.data });
        })
        .catch((err) => console.log(err));
    }
  }
  handleClose = () => this.setState({ show: false });

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.selectProgram != null ||
      this.state.selectProgram != undefined
    ) {
      this.props.getChapterAndClass(
        JSON.parse(this.state.selectProgram),
        JSON.parse(this.state.selectClass)
      );
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
          <Modal.Header className="color-titre-ajout">
            <Modal.Title>Selection de la Classe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="noticeUploadCours text-danger">
                <strong>NB</strong>: Veuillez séléctionner dans l'ordre
                classe-matière-chapitre en patientant 4 secondes par sélection
              </div>
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

              <div className="form-group">
                <label htmlFor="niveau">Matière</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    this.setState({ selectMatter: parseInt(e.target.value) })
                  }
                  id="niveau"
                >
                  {this.state.matiere.length != 0 ? (
                    <option>Maintenant séléctionnez la matière </option>
                  ) : (
                    <option>------------------ </option>
                  )}
                  {this.state.matiere.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.matter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="niveau">Chapitre</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    this.setState({ selectProgram: e.target.value })
                  }
                  id="niveau"
                >
                  {this.state.program.length != 0 ? (
                    <option>Maintenant séléctionnez le chapitre </option>
                  ) : (
                    <option>------------------ </option>
                  )}
                  {this.state.program.map((prog) => (
                    <option key={prog.id} value={JSON.stringify(prog)}>
                      {prog.title}
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
