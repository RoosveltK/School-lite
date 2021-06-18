import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FaChevronRight } from "react-icons/fa";
import ProgressBar from "../progressBar";
toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props);
    let initialState = {
      maxQuestion: 10,
      idQuestion: 1,
      btnActive: true,
      options: null,
      userResponse: null,
    };
    this.state = initialState;
    this.completQuiz = React.createRef();
  }

  nextQuestion = () => {
    let idQuestion = this.state.idQuestion;
    idQuestion += 1;

    this.setState({ idQuestion });
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
        <ProgressBar idQ={this.state.idQuestion} max={this.state.maxQuestion} />
        <h2>Qui est tu ?</h2>

        <button disabled={this.state.btnActive} className="btn btnSubmit" onClick={() => this.nextQuestion()}>
          {this.state.idQuestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    );
  }
}

export default Quiz;
