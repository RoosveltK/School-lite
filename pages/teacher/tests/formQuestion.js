import React from "react";
import InputQuestion from "./inputQuestion";

class Form extends React.Component {
  state = {
    question: "",
    reponseRecup: "",
    valeurRecup: false,
    block: null,
  };
  //   handleChange = (e) => {
  //     this.props.handleInputChange(e.target.value);
  //   };

  handleRecupReponse = (quest) => {
    this.setState({
     reponseRecup: quest,
    });
  };
  handleRecupStatut = (val) => {
    this.setState({
      valeurRecup: val,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.reponseRecup !== prevState.reponseRecup) |
      (this.state.valeurRecup !== prevState.valeurRecup)
    ) {
      const datas = {
        rep: this.state.reponseRecup,
        val: this.state.valeurRecup,
      };
      this.setState({
        block: datas,
      });
    }
  }

  render() {
    const reponse = this.state.reponseRecup;
    const valeur = this.state.valeurRecup;
    return (
      <>
        <React.Fragment>
          <div className="questionTest">
            <label>Question {this.props.numberQuestion} : </label>
            <input
              type="text"
              className="form-control"
              placeholder={`Veuillez saisir la question`}
              onChange={(e) => {
                this.setState({ question: e.target.value });
              }}
              name={`question`}
            />
          </div>

          <div className="form-group ">
            <label>Réponses</label>
            <div class="groupeReponse">
              <InputQuestion
                placeholder={`Réponse 1`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
                reponse={reponse}
                valeur={valeur}
              />
              {/* <InputQuestion
                placeholder={`Réponse 2`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
              />
              <InputQuestion
                placeholder={`Réponse 3`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
              />
              <InputQuestion
                placeholder={`Réponse 4`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
              /> */}
            </div>
          </div>
          <hr />
        </React.Fragment>
      </>
    );
  }
}
export default Form;
