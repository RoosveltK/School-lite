import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const InfoPresence = ({ dataStudent }) => {
  const [cours, setCours] = useState(false);
  const [test, setTests] = useState(false);
  const { id, first_name, username, email, matricule } = dataStudent;

  const handleNotify = (e, nom) => {
    if (nom == "cours") {
      setCours(e.target.checked);
      if (e.target.checked) toast.success("Présence marquée avec succès");
      else toast.warning("Enregistrée avec succès");
    } else {
      setTests(e.target.checked);
      if (e.target.checked) toast.success("Présence marquée avec succès");
      else toast.warning("Enregistré avec succès");
    }
  };
  return (
    <>
      <tr>
        <td>{matricule}</td>
        <td>{first_name}</td>
        <td>{username}</td>
        <td class="centerContent">
          <input
            type="checkbox"
            name="cours"
            onChange={(e) => handleNotify(e, "cours")}
          />
        </td>
        <td class="centerContent">
          <input
            type="checkbox"
            name="tests"
            onChange={(e) => handleNotify(e, "tests")}
          />
        </td>
      </tr>
    </>
  );
};

export default InfoPresence;
