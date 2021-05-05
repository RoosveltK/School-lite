import React from "react";
import LayoutT from "../../../components/LayoutT";
import ModalAddTest from "../../../components/user/teacher/ModalAddTest";
import { SiGoogleclassroom } from "react-icons/si";

const templateReponse = {
  rep: "",
  valeur: false,
};
const templateQuestion = {
  num: 0,
  reponses: [
    templateReponse,
    templateReponse,
    templateReponse,
    templateReponse,
  ],
};

var aideRecupValue = [
  templateQuestion,
  templateQuestion,
  templateQuestion,
  templateQuestion,
];
class Tests extends React.Component {
  state = {
    tabQuestion: [
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
    ],
    numQuestion: 4,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.numQuestion !== prevState.numQuestion) {
      let tab = this.state.tabQuestion.slice();
      let i = 0;
      if (this.state.numQuestion > prevState.numQuestion) {
        i = 0;
        while (i != this.state.numQuestion - prevState.numQuestion) {
          tab.push(templateQuestion);
          i += 1;
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
    if (this.state.tabQuestion !== prevState.tabQuestion) {
      aideRecupValue = this.state.tabQuestion.slice();
      console.log(aideRecupValue);
    }
  }
  handleInputChange = (event) => {
    const target = event.target;
    const valeur = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const num = this.state.tabQuestion[index].num;
    const rep = this.state.tabQuestion[index].reponses[i].rep;
    const val = this.state.tabQuestion[index].reponses[i].valeur;

    this.setState({
      [name]: value,
    });
  };
  handleNumQuestion = (valeur, index) => {
    let tabCpy = [...this.state.tabQuestion];
    tabCpy[index].num = valeur;
    this.setState({ tabQuestion: tabCpy });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.question);
    // const datas = this.state.tabQuestion.slice();
    // console.log(datas);
    console.log(aideRecupValue);
  };

  render() {
    return (
      <LayoutT title="Tests">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> <span>Classe 5</span>
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
                          key={index}
                          // value={this.state.tabQuestion[index].num}
                          className="form-control"
                          placeholder={`Veuillez saisir la question`}
                          // onChange={(e) =>
                          //   this.handleNumQuestion(e.target.value, index)
                          // }
                          onChange={(e) =>
                            (aideRecupValue[index].num = e.target.value)
                          }
                        />
                      </React.Fragment>
                      <div className="form-group ">
                        <label>Réponses</label>
                        <div className="groupeReponse">
                          {question.reponses.map((valeur, i) => (
                            <React.Fragment>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  aideRecupValue[index].reponses[i].rep =
                                    e.target.value;
                                }}
                                placeholder={`Reponse  ${i + 1}`}
                                name="reponse"
                              />
                              <input
                                name="reponseValue"
                                type="checkbox"
                                onChange={(e) => {
                                  aideRecupValue[index].reponses[i].valeur =
                                    e.target.checked;
                                }}
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
                  <button type="submit" className="btn boutonT">
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
