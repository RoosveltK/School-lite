import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
  const { levelNames, score, maxQuestion, quizLevel, percent, loadNextLevel } =
    props;
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  if (score < maxQuestion / 2) {
    setTimeout(() => loadNextLevel(0), 5000);
  }

  const decision =
    score >= maxQuestion / 2 ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <p className="successMsg">Bravo, vous avez atteint la moyenne</p>
          ) : null}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestion}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestion}
          </div>
        </div>
      </Fragment>
    );

  const datasReceive = asked.map((question) => {
    return (
      <tr key={question.id}>
        <td>{question.content}</td>
        <td>{question.answer}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      {decision}
      <hr />
      <p>Réponses aux questions :</p>

      <div className="answerContainer">
        <table className="answers" id="myTable">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
            </tr>
          </thead>
          <tbody>
            {score >= maxQuestion / 2 ? (
              datasReceive
            ) : (
              <tr>
                <td colSpan="3">
                  <div className="loader"></div>
                  <p style={{ textAlign: "center", color: "#198754" }}>
                    Pas de réponses
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
