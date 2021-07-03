import React from "react";

const ProgressBar = (props) => {
  const { idQ, max } = props;
  const tailleBar = (total, id) => {
    return (100 / total) * id;
  };
  const progression = tailleBar(max, idQ + 1);

  return (
    <>
      <div className="percentage">
        <div className="progressPercent">{`Question : ${idQ + 1}/${max}`}</div>
        <div className="progressPercent">{`Progression ${progression} %`} </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progression}%` }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
