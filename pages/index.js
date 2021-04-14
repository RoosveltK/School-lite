import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Defile } from "../scripts/script";
import { form } from "../scripts/form";
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [btn, setBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const affiche = setInterval(Defile, 150);
    form();
    return () => {
      clearInterval(affiche);
    };
  });

  useEffect(() => {
    if (password !== "" && email !== "") setBtn(true);
    else if (btn === true) setBtn(false);
  }, [password, email, btn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };
    console.log(user);
    setLoading(true);

    axios
      .post("/users/signin", user)
      .then(() => Router.push("enseignant"))
      .catch(() => toast.error("Erreur lors de la connexion"));
    setTimeout(setLoading(false), 5000);
  };

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <body>
        <div class="container-fluid p-0 over-hidden">
          <img
            src="/static/background.jpg"
            className="pos-img-back hide-img-sm card-img over-hidden"
            alt="Image de fond"
          />
          <div class="row card-img-overlay over-hidden p-sm-1">
            <h1 class="mb-md-5 text-center text-md-start ps-md-5 col-md-6 mt-5 col-sm-12 fw-bold pe-md-5 text-apparition">
              School Online
            </h1>

            <form
              class="col-md-5 col-sm-12 g-3 p-md-5 ms-md-5 ms-sm-0 d-flex justify-content-between flex-column align-items-center mt-sm-5 p-4 needs-validation"
              novalidate
            >
              <h2 class="pb-3 text-start mt-md-5 mt-sm-0">Sign In</h2>
              <div class="d-flex justify-content-between flex-column align-items-center  col-12">
                <div class="form-floating border-1 mb-3 fs-5 col-10">
                  <input
                    type="email"
                    class="border-0 border-dark none_border border-bottom border-1 form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating border-1 fs-5 col-10">
                  <input
                    type="password"
                    class="form-control border-0 border-bottom  border-dark border-1 none_border "
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
              </div>
              <button class="btn btn-success col-10 fw-bold" type="submit">
                Sign In
              </button>
              <p>
                Mot de passe oublié ?{" "}
                <a href="#" class="fw-bold text-decoration-none text-dark">
                  cliquez ici
                </a>
              </p>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};
export default Login;
