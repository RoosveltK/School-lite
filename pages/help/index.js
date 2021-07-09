import React, { useState } from "react";
import axios from "axios";
const index = () => {
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    /*CONNEXION*/
    const info = {
      client_id: "roosvelt", //ne change pas xa
      client_secret: "roosvelt12345", //ne change pas xa
      grant_type: "password", //ne change pas xa
      username: "alain@gmail.com", //email de l'utilisateur en esperant que le username et l'email soit identique
      password: "kenne12345", //mot de passe
    };

    /*CREATION DE COMPTE*/
    // const info = {
    //   email: "alain@gmail.com",
    //   username: "Alain",
    //   password: "kenne12345",
    // };
    console.log(info);
    axios
      .post(`/auth/token`, info)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formm-group">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formm-group">
          <input
            type="text"
            placeholder="Describe"
            onChange={(e) => setDescribe(e.target.value)}
          />
        </div>
        <button type="submit">Soummettre</button>
      </form>
    </div>
  );
};

export default index;
