import React from "react";
import InputQuestion from "./inputQuestion";

class Form extends React.Component {
  state = {
    reponseRecup1: "",
    valeurRecup1: false,
    block1: null,
  };

  handleRecupReponse = (name, quest) => {
    this.setState({
      [name]: quest,
    });
  };
  handleRecupStatut = (name, val) => {
    this.setState({
      [name]: val,
    });
  };
  handleAddBlock = () => {
    const datas = {
      rep: this.state.reponseRecup,
      val: this.state.valeurRecup,
    };
    this.setState({
      block: datas,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.reponseRecup !== prevState.reponseRecup) |
      (this.state.valeurRecup !== prevState.valeurRecup)
    ) {
    }
  }

  render() {
    const reponse = this.state.reponseRecup;
    const valeur = this.state.valeurRecup;
    return (
      <>
        <React.Fragment>
          <InputQuestion
            placeholder={`Réponse 1`}
            handleRecupReponse={this.handleRecupReponse}
            handleRecupStatut={this.handleRecupStatut}
            reponse={reponse}
            valeur={valeur}
            reponseRecup="reponseRecup1"
            valeurRecup="valeurRecup1"
          />
          <hr />
        </React.Fragment>
      </>
    );
  }
}
export default Form;
