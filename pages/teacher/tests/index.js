import React from "react";
import LayoutT from "../../../components/LayoutT";
import ModalSelectTest from "../../../components/tests/ModalSelectTest";
import { SiGoogleclassroom } from "react-icons/si";
import axios from "axios";
import { toast } from "react-toastify";

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testQuestion: [],
      tabQuestion: [
        {
          id: 1,
          question: "",
          reponses: [
            {
              id: 1,
              rep: "",
              valeur: false,
            },
            {
              id: 2,
              rep: "",
              valeur: false,
            },
            {
              id: 3,
              rep: "",
              valeur: false,
            },
            {
              id: 4,
              rep: "",
              valeur: false,
            },
          ],
        },
        {
          id: 2,
          question: "",
          reponses: [
            {
              id: 5,
              rep: "",
              valeur: false,
            },
            {
              id: 6,
              rep: "",
              valeur: false,
            },
            {
              id: 7,
              rep: "",
              valeur: false,
            },
            {
              id: 8,
              rep: "",
              valeur: false,
            },
          ],
        },
        {
          id: 3,
          question: "",
          reponses: [
            {
              id: 9,
              rep: "",
              valeur: false,
            },
            {
              id: 10,
              rep: "",
              valeur: false,
            },
            {
              id: 11,
              rep: "",
              valeur: false,
            },
            {
              id: 12,
              rep: "",
              valeur: false,
            },
          ],
        },
        {
          id: 4,
          question: "",
          reponses: [
            {
              id: 13,
              rep: "",
              valeur: false,
            },
            {
              id: 14,
              rep: "",
              valeur: false,
            },
            {
              id: 15,
              rep: "",
              valeur: false,
            },
            {
              id: 16,
              rep: "",
              valeur: false,
            },
          ],
        },
      ],
      numQuestion: 4,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.numQuestion !== prevState.numQuestion) {
      let tab = this.state.tabQuestion.slice();
      let i = 0;
      if (this.state.numQuestion > prevState.numQuestion) {
        i = 0;
        let id = prevState.numQuestion + 1;
        let idRep = this.state.tabQuestion.length * 4;
        while (i != this.state.numQuestion - prevState.numQuestion) {
          let template = {
            id: id,
            question: "",
            reponses: [
              {
                id: (idRep += 1),
                rep: "",
                valeur: false,
              },
              {
                id: (idRep += 1),
                rep: "",
                valeur: false,
              },
              {
                id: (idRep += 1),
                rep: "",
                valeur: false,
              },
              {
                id: (idRep += 1),
                rep: "",
                valeur: false,
              },
            ],
          };
          tab.push(template);
          i += 1;
          id += 1;
        }
      } else if (this.state.numQuestion < prevState.numQuestion) {
        i = 0;
        while (i != prevState.numQuestion - this.state.numQuestion) {
          tab.pop();
          i += 1;
        }
      }
      this.setState({
        tabQuestion: tab,
      });
    }
  }

  handleQuestion = (event, index) => {
    let tabCpy = [...this.state.tabQuestion];
    tabCpy[index].question = event.target.value;
    this.setState({ tabQuestion: tabCpy });
  };

  handleReponse = (event, index, i) => {
    let tabCpy = [...this.state.tabQuestion];
    const target = event.target;
    const valeur = target.type === "checkbox" ? target.checked : target.value;
    if (valeur === target.checked) {
      tabCpy[index].reponses[i].valeur = valeur;
    } else {
      tabCpy[index].reponses[i].rep = valeur;
    }
    this.setState({ tabQuestion: tabCpy });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.tabQuestion.forEach((element) => {
      axios
        .post(`api/school/question`, {
          lesson: 1,
          content: element.question,
        })
        .then((res) => {
          element.reponses.forEach((rep) => {
            axios
              .post(`api/school/reponse`, {
                question: res.data.id,
                content: rep.rep,
                verify: rep.valeur,
              })
              .catch(() => console.log("erreur"));
          });
        })
        .catch(() => toast.error("Erreur lors de la creation de test"));
    });
  };
  getInfo = (matiere, niveau, specialite) => {
    this.setState({ matiere: matiere });
    this.setState({ niveau: niveau });
    this.setState({ specialite: specialite });
  };
  render() {
    return (
      <LayoutT title="Tests">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> <span>{this.state.niveau}</span>
          </div>
          <div id="triangle"></div>
          <h3 className="form-group">
            Titre :{" "}
            <select className="form-select">
              <option>Equations</option>
              <option>.</option>
              <option>..</option>
            </select>
          </h3>
        </div>
        <ModalSelectTest recuperation={this.getInfo} />
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card centrer">
                <span>TESTS : QCM </span>
                <select
                  className="form-select taille"
                  value={this.state.numQuestion}
                  onChange={(e) =>
                    this.setState({ numQuestion: parseInt(e.target.value) })
                  }
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </header>
            <section className="row">
              <form onSubmit={this.handleSubmit}>
                {this.state.tabQuestion.map((question, index) => {
                  return (
                    <React.Fragment>
                      <React.Fragment>
                        <label>Question {index + 1}:</label>
                        <input
                          type="text"
                          key={this.state.tabQuestion[index].id}
                          className="form-control"
                          placeholder={`Veuillez saisir la question`}
                          onChange={(e) => this.handleQuestion(e, index)}
                        />
                      </React.Fragment>
                      <div className="form-group ">
                        <label>Réponses</label>
                        <div className="groupeReponse">
                          {question.reponses.map((valeur, i) => (
                            <React.Fragment>
                              <input
                                key={
                                  this.state.tabQuestion[index].reponses[i].id
                                }
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                  this.handleReponse(e, index, i)
                                }
                                placeholder={`Reponse  ${i + 1}`}
                                name="reponse"
                              />
                              <input
                                key={
                                  this.state.tabQuestion[index].reponses[i].id
                                }
                                name="reponseValue"
                                type="checkbox"
                                onChange={(e) =>
                                  this.handleReponse(e, index, i)
                                }
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div className="col-12 header-card">
                  <span></span>
                  <button type="submit" className="btn review bntTeacher ">
                    Créer
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Tests;
