import React from "react";
import InputQuestion from "./inputQuestion";

class Collect extends React.Component {
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
        </React.Fragment>
      </>
    );
  }
}
export default Collect;
