import React from "react";
import InputQuestion from "./inputQuestion";

class Form extends React.Component {
  state = {
    reponseRecup1: "",
    valeurRecup1: false,
    block1: null,
    reponseRecup2: "",
    valeurRecup2: false,
    block2: null,
    reponseRecup3: "",
    valeurRecup3: false,
    block3: null,
    reponseRecup4: "",
    valeurRecup4: false,
    block4: null,
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
          <div className="form-group ">
            <label>Réponses</label>
            <div className="groupeReponse">
              <InputQuestion
                placeholder={`Réponse 1`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
                reponse={reponse}
                valeur={valeur}
                reponseRecup="reponseRecup1"
                valeurRecup="valeurRecup1"
              />
              <InputQuestion
                placeholder={`Réponse 2`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
                reponse={reponse}
                valeur={valeur}
                reponseRecup="reponseRecup2"
                valeurRecup="valeurRecup2"
              />
              <InputQuestion
                placeholder={`Réponse 3`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
                reponse={reponse}
                valeur={valeur}
                reponseRecup="reponseRecup3"
                valeurRecup="valeurRecup3"
              />
              <InputQuestion
                placeholder={`Réponse 4`}
                handleRecupReponse={this.handleRecupReponse}
                handleRecupStatut={this.handleRecupStatut}
                reponse={reponse}
                valeur={valeur}
                reponseRecup="reponseRecup4"
                valeurRecup="valeurRecup4"
              />
            </div>
          </div>
          <hr />
        </React.Fragment>
      </>
    );
  }
}
export default Form;
