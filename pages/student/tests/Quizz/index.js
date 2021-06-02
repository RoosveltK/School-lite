import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FaChevronRight } from "react-icons/fa";
import ProgressBar from "../progressBar";
toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      maxQuestion: 10,
      idQuestion: 0,
      btnActive: true,
      options: null,
      userResponse: null,
    };
    this.state = this.initialState;
    this.completQuiz = React.createRef();
  }

  render() {
    // const question = this.state.options.map((option, index) => {
    //   return (
    //     <p
    //       key={index}
    //       className={`answerOptions ${
    //         this.state.userResponse === option ? "selected" : null
    //       }`}
    //       onClick={() => this.handleAnswer(option)}
    //     >
    //       <FaChevronRight /> {option}
    //     </p>
    //   );
    // });
    return (
      <div>
        <ProgressBar id={this.state.idQuestion} max={this.state.maxQuestion} />
        <h2>Qui est tu ?</h2>
        Hello
        <button disabled={this.state.btnActive} className="btnSubmit">
          {this.state.idQuestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    );
  }
}

export default Quiz;
