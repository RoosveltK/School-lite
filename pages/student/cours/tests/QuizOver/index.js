import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadNextLevel,
    userInfo,
    leconInfo,
  } = props;
  const [asked, setAsked] = useState([]);
  const [realScore, setRealScore] = useState(null);

  useEffect(() => {
    setAsked(ref.current);
    sendScore();
  }, [ref, realScore]);

  const sendScore = () => {
    let realScore = (score * 20) / maxQuestion;
    setRealScore(setRealScore);
    const data = {
      note: realScore,
      lesson: leconInfo.id,
      student: userInfo.id,
    };
    axios
      .post(`api/school/test/result`, data)
      .then(() => {
        if (score < maxQuestion / 2)
          toast.warning(
            `Vous devez encore fournir des efforts ${userInfo.first_name}`
          );
        else
          toast.success(`Félicitation ${userInfo.first_name} continuez ainsi`);
      })
      .catch((err) =>
        // toast.warning(
        //   `Vous avez déja un score qu'on ne peut changer mais continuez à vous exercer`
        // )
        console.log(err)
      );
  };

  // if (score < maxQuestion / 2) {
  //   setTimeout(() => loadNextLevel(0), 5000);
  // }

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
            Note : {(score * 20) / maxQuestion}/20
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
            Note : {(score * 20) / maxQuestion}/20
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
