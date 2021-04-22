import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Defile } from "../scripts/script";
import { form } from "../scripts/form";
import Router from "next/router";
import { toast } from "react-toastify";
import axiosInstance from "../api/Login";

const Login = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    const affiche = setInterval(Defile, 150);
    form();
    return () => {
      clearInterval(affiche);
    };
  });

  useEffect(() => {
    if (password !== "" && email !== "") setBtn(true);
    else if (btn) setBtn(false);
  }, [password, email, btn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      client_id: "roosvelt",
      client_secret: "roosvelt12345",
      grant_type: "password",
      username: email,
      password: password,
    };
    console.log(user);

    await axiosInstance
      .post(`auth/token/`, user)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        console.log(res);
        Router.push("enseignant");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la connexion");
      });
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <main>
        <div className="container-fluid p-0 over-hidden">
          <img
            src="/static/background.jpg"
            className="pos-img-back hide-img-sm card-img over-hidden"
            alt="Image de fond"
          />
          <div className="row card-img-overlay  p-sm-1">
            <h1 className="mb-md-5 text-center text-md-start ps-md-5 col-md-6 mt-5 col-sm-12 fw-bold pe-md-5 text-apparition">
              School Online
            </h1>
            <form
              className="col-md-5 col-sm-12 g-3 p-md-5 ms-md-5 ms-sm-0 d-flex justify-content-between flex-column align-items-center mt-sm-5 p-4 needs-validation"
              onSubmit={handleSubmit}
            >
              <h2 className="pb-3 text-start mt-md-5 mt-sm-0">Sign In</h2>
              <div className="d-flex justify-content-between flex-column align-items-center  col-12">
                <div className="form-floating border-1 mb-3 fs-5 col-10">
                  <input
                    required
                    type="email"
                    className="effetVoulu border-0 border-dark none_border border-bottom border-1 form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating border-1 fs-5 col-10">
                  <input
                    required
                    type="password"
                    className="effetVoulu form-control border-0 border-bottom  border-dark border-1 none_border "
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
              {btn ? (
                <button className="btn btn-success col-10 fw-bold">
                  Sign In
                </button>
              ) : (
                <button className="btn btn-success col-10 fw-bold" disabled>
                  Sign In
                </button>
              )}
              <p>
                Mot de passe oublié ?{" "}
                <a
                  href="mailto:"
                  className="fw-bold text-decoration-none text-dark"
                >
                  cliquez ici
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;
