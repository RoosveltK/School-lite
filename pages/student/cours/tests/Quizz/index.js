import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FaChevronRight } from "react-icons/fa";
import ProgressBar from "../progressBar";
import { Responses } from "../../../../../lib/responses";
import { Questions } from "../../../../../lib/questions";
import QuizOver from "../QuizOver";
import { Table } from "react-bootstrap";
import { MdIndeterminateCheckBox } from "react-icons/md";

toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      levelType: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestion: 4,
      saveQuestion: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnActive: true,
      userResponse: null,
      score: 0,
      welcomeMsg: false,
      quizPartEnd: false,
    };
    this.state = this.initialState;
    this.completQuiz = React.createRef();
  }

  loadQuestion = () => {
    let tab = [];
    let datas = [];
    this.props.quiz.forEach((elt) => {
      datas.push(elt.content);
      elt.response.forEach((question) => {
        if (question.verify == true) {
          tab.push({
            content: elt.content,
            answer: question.content,
          });
        }
      });
    });

    this.completQuiz.current = tab;

    this.setState({ maxQuestion: tab.length });
    this.setState({
      saveQuestion: datas,
    });
  };

  componentDidMount() {
    this.loadQuestion();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.saveQuestion !== prevState.saveQuestion &&
      this.state.saveQuestion.length
    ) {
      let rep = [];
      this.props.quiz.forEach((element, index) => {
        if (index == this.state.idQuestion) rep = element.response;
      });

      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion],
        options: rep,
      });
    }

    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.saveQuestion.length
    ) {
      let rep = [];
      this.props.quiz.forEach((element, index) => {
        if (index == this.state.idQuestion) rep = element.response;
      });
      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion],
        options: rep,
        btnActive: true,
        userResponse: null,
      });
    }

    if (this.state.quizPartEnd !== prevState.quizPartEnd) {
      const pourcent = this.getPourcentage(
        this.state.maxQuestion,
        this.state.score
      );
      this.levelOver(pourcent);
    }
  }

  handleAnswer = (resp) => {
    this.setState({
      userResponse: resp,
      btnActive: false,
    });
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
      this.setState({
        quizPartEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const correctQuestion = this.completQuiz.current[this.state.idQuestion];

    //Verif du score
    if (this.state.userResponse.verify == true) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success(` Bravo ✌  +1`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error(` Raté 0 😥 `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: "toastify-color",
      });
    }
  };

  getPourcentage = (maxquestion, score) => (score / maxquestion) * 100;

  levelOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent,
      });
    } else {
      this.setState({ percent });
    }
  };
  loadNextLevel = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });
    this.loadQuestion();
  };

  render() {
    const question = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userResponse === option ? "selected" : null
          }`}
          onClick={() => this.handleAnswer(option)}
        >
          <FaChevronRight /> {option.content}
        </p>
      );
    });

    return this.state.quizPartEnd ? (
      <QuizOver
        ref={this.completQuiz}
        levelNames={this.state.levelType}
        score={this.state.score}
        maxQuestion={this.state.maxQuestion}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadNextLevel={this.loadNextLevel}
      />
    ) : (
      <div>
        <ProgressBar idQ={this.state.idQuestion} max={this.state.maxQuestion} />
        <h2>{this.state.question}</h2>
        {question}
        <button
          disabled={this.state.btnActive}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {this.state.idQuestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    );
  }
}

export default Quiz;
