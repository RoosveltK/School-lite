import React from "react";
import LayoutT from "../../../components/LayoutT";
import ModalAddTest from "../../../components/user/teacher/ModalAddTest";
import { SiGoogleclassroom } from "react-icons/si";
import Form from "./formQuestion";

class Tests extends React.Component {
  state = {
    nbreBlock: 4,
    testTab: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nbreBlock !== prevState.nbreBlock)
      console.log(this.state.nbreBlock);
  }

  reload = () => {
    this.setState.tabQuestion.map((block) => block);
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.question);
    const datas = {
      question: "",
      responses: [],
    };
  };
  // handleSave = (question) => {
  //   tabCopy = this.state.testTab.slice();
  //   tabCopy.push(question);
  //   this.setState({ testTab: tabCopy });
  // };

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
                  value={this.state.nbreBlock}
                  onChange={(e) => {
                    this.setState({ nbreBlock: parseInt(e.target.value) });
                  }}
                >
                  <option value="0">4</option>
                  <option value="1">5</option>
                  <option value="2">6</option>
                  <option value="3">7</option>
                  <option value="4">8</option>
                  <option value="5">9</option>
                  <option value="6">10</option>
                </select>
              </div>
            </header>
            <section className="row">
              <form onSubmit={this.handleSubmit}>
                <Form
                  numberQuestion={`1`}
                  handleInputChange={this.handleInputChange}
                  handleSave={this.handleSave}
                />
                <Form
                  numberQuestion={`2`}
                  handleInputChange={this.handleInputChange}
                  handleSave={this.handleSave}
                />
                <Form
                  numberQuestion={`3`}
                  handleInputChange={this.handleInputChange}
                  handleSave={this.handleSave}
                />
                <Form
                  numberQuestion={`4`}
                  handleInputChange={this.handleInputChange}
                  handleSave={this.handleSave}
                />{" "}
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
