import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export default class ModalAddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      numberQuestion: 1,
      question: " ",
      repExacte: "",
      rep1: "",
      rep2: "",
      rep3: "",
      questions: [],
      responses: [],
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleChange = (e) => {
    const value = e.target.value;
    this.handleAdd(value);
  };
  handleAdd = (event) => {
    event.preventDefault();
    const quesTable = [...this.state.questions];
    const responses = [...this.state.responses];
    quesTable.push(this.state.question);
    responses.push(this.state.rep1);
    responses.push(this.state.rep2);
    responses.push(this.state.rep3);

    this.setState({ questions: quesTable, responses: responses });
    console.log(this.state.questions);
    console.log(this.state.responses);
  };

  handleCreate = async (event) => {
    event.preventDefault();
    const data = {
      question: this.state.question,
      reponses: this.state.reponses,
    };
    console.log(data);

    this.setState({ show: false });
  };

  render() {
    console.log(this.state.matiereE);
    return (
      <>
        <Button
          variant="dark"
          className="btn boutonE"
          onClick={this.handleShow}
        >
          NOUVEAU
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          className="modalSuppression"
        >
          <Modal.Header className="color-titre-ajout" closeButton>
            <Modal.Title className="colorTitre">CREATION D'UN TEST</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-form">
              <form onSubmit={this.handleAdd}>
                <div>
                  <label>Question {this.state.numberQuestion}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ question: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Réponse Exacte</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="La réponse exacte de la question"
                    onChange={(e) =>
                      this.setState({ repExacte: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Réponse</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reponse pour embrouiller"
                    onChange={(e) => this.setState({ rep1: e.target.value })}
                  />
                </div>
                <div>
                  <label>Réponse</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reponse pour embrouiller"
                    onChange={(e) => this.setState({ rep2: e.target.value })}
                  />
                </div>
                <div>
                  <label>Réponse</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reponse pour embrouiller"
                    onChange={(e) => this.setState({ rep3: e.target.value })}
                  />
                </div>
                <button>Autre question</button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} className="btn btn-secondary">
              FERMER
            </Button>
            <Button className="btn color-titre-ajout">VALIDER</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
