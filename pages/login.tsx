import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Defile } from "../scripts/script";
import { signIn } from "../lib/auth";
import Router from "next/router";

const Login = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const affiche = setInterval(Defile, 100);
    return () => {
      clearInterval(affiche);
    };
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const user = { email, password };
    console.log(user);
    setLoading(true);
    setInterval(() => setLoading(false), 5000);
    // signIn(user).then(() => Router.push("/"));
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
            src="/static/image/background.jpg"
            className="pos-img-back hide-img-sm card-img over-hidden"
            alt="Image de fond"
          />
          <div className="row card-img-overlay over-hidden p-sm-1">
            <h1 className="mb-md-5 text-center text-md-start ps-md-5 col-md-6 mt-5 col-sm-12 fw-bold pe-md-5 text-apparition">
              School Online
            </h1>

            <form
              onSubmit={handleSubmit}
              className="col-md-5 col-sm-12 g-3 p-md-5 ms-md-5 ms-sm-0 d-flex justify-content-between flex-column align-items-center mt-sm-5 p-4 needs-validation"
            >
              <h2 className="pb-3 text-start mt-md-5 mt-sm-0">Sign In</h2>
              <div className="d-flex justify-content-between flex-column align-items-center  col-12">
                <div className="form-floating border-1 mb-3 fs-5 col-10">
                  <input
                    type="email"
                    className="border-0 border-dark none_border border-bottom border-1 form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating border-1 fs-5 col-10">
                  <input
                    type="password"
                    className="form-control border-0 border-bottom  border-dark border-1 none_border "
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
              <button
                disabled={loading}
                className="btn btn-success col-10 fw-bold"
                type="submit"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p>
                Mot de passe oublié ?{" "}
                <a href="#" className="fw-bold text-decoration-none text-dark">
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
