import React, { Fragment } from "react";

const Loader = () => {
  return (
    <Fragment>
      <h1 className="titreLoader">SCHOOL ONLINE</h1>
      <div className="loader"></div>
      <p className="loaderText">Please wait</p>
    </Fragment>
  );
};

export default Loader;
