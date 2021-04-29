import React from "react";
import LayoutT from "../../../components/LayoutT";
import ModalAddTest from "../../../components/user/teacher/ModalAddTest";
import { SiGoogleclassroom } from "react-icons/si";

const templateQuestion = {
  num: "",
  reponses: [
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
  ],
};

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
  reponses = {
    rep: "",
    value: false,
  };

  tabReponses = [
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
    {
      rep: "",
      value: false,
    },
  ];

  question = {
    numQuestion: 0,
    reponses: [
      {
        rep: "",
        value: false,
      },
      {
        rep: "",
        value: false,
      },
      {
        rep: "",
        value: false,
      },
      {
        rep: "",
        value: false,
      },
    ],
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.numQuestion !== prevState.numQuestion) {
      let tab = this.state.tabQuestion.slice();
      if (this.state.numQuestion > prevState.numQuestion) {
        tab = [];
        this.setState({ tabQuestion: tab });
        let i = 0;
        while (i != this.state.numQuestion) {
          tab.push(templateQuestion);
          i += 1;
        }
      } else if (this.state.numQuestion < prevState.numQuestion) {
        let i = 0;

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
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleRelaod = () => {};
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.question);
    const datas = {
      question: "",
      responses: [],
    };
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
                {this.state.tabQuestion.map((question, index) => (
                  <React.Fragment>
                    <React.Fragment>
                      <label>Question {index + 1}:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Veuillez saisir la question`}
                        onChange={(e) => {
                          this.setState({ question: e.target.value });
                        }}
                        name={`question`}
                      />
                    </React.Fragment>
                    <div className="form-group ">
                      <label>Réponses</label>
                      <div className="groupeReponse">
                        {question.reponses.map((valeur, index) => (
                          <React.Fragment>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Reponse  ${index + 1}`}
                            />
                            <input type="checkbox" />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}

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
