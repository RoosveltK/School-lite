import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadNextLevel,
    leconInfo,
  } = props;
  const [asked, setAsked] = useState([]);
  const [realScore, setRealScore] = useState(null);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref, realScore]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("studentInfo"));
    sendScore(userInfo);
  }, []);

  const sendScore = (userInfo) => {
    let realScore = (score * 20) / maxQuestion;
    realScore = parseFloat(realScore);
    setRealScore(realScore.toFixed(2));
    const data = {
      note: realScore,
      lesson: leconInfo.id,
      student: userInfo.id,
    };
    axios
      .post(`api/school/test/result`, data)
      .then(() => {
        if (realScore < 10)
          toast.warning(
            `Vous devez encore fournir des efforts ${userInfo.first_name}`
          );
        else
          toast.success(`Félicitation ${userInfo.first_name} continuez ainsi`);
      })
      .catch(() =>
        toast.warning(
          `Vous avez déja un score qu'on ne peut changer mais continuez à vous exercer`
        )
      );
  };

  if (score < maxQuestion / 2) {
    setTimeout(() => Router.push(`/student/cours/${leconInfo.program}`), 3000);
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
          <div className="progressPercent">
            Réussite : {parseFloat(percent).toFixed(2)}%
          </div>
          <div className="progressPercent">
            Note : {((score * 20) / maxQuestion).toFixed(2)}/20
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">
            Réussite : {parseFloat(percent).toFixed(2)}%
          </div>
          <div className="progressPercent">
            Note :{((score * 20) / maxQuestion).toFixed(2)}/20
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
                    Vous allez être redirigé vers le cours pour mieux réviser
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
