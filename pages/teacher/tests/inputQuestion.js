import React from "react";

class InputQuestion extends React.Component {
  handleChangeResponse = (e) => {
    this.props.handleRecupReponse(this.props.reponseRecup, e.target.value);
  };
  handleChangeStatut = (e) => {
    this.props.handleRecupStatut(this.props.valeurRecup, e.target.checked);
  };

  render() {
    const reponse = this.props.reponse;
    const valeur = this.props.valeur;
    return (
      <React.Fragment>
        <input
          onChange={this.handleChangeResponse}
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={reponse}
        />
        <input
          type="checkbox"
          onChange={this.handleChangeStatut}
          value={valeur}
        />
      </React.Fragment>
    );
  }
}
export default InputQuestion;
