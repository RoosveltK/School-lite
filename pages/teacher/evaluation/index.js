import React from "react";
import LayoutT from "../../../components/LayoutT";
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
class Evaluation extends React.Component {
  state = {
    tabQuestion: [
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
      templateQuestion,
    ],
    numQuestion: 10,
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
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                  <option value={35}>35</option>
                  <option value={40}>40</option>
                  <option value={45}>45</option>
                  <option value={50}>50</option>
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
                          value={question.num}
                          className="form-control"
                          placeholder={`Veuillez saisir la question`}
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
                                placeholder={`Reponse  ${i + 1}`}
                                name="reponse"
                              />
                              <input name="reponseValue" type="checkbox" />
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
export default Evaluation;
