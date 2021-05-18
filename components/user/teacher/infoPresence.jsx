import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const InfoPresence = () => {
  const [cours, setCours] = useState(false);
  const [test, setTests] = useState(false);
  //   const {
  //     id,
  //     first_name,
  //     username,
  //     email,
  //     matricule,
  //   } = dataStudent;
  const handleNotify = (e, nom) => {
    if (nom == "cours") {
      setCours(e.target.checked);
      console.log(`La valeur du test est : ${e.target.checked}`);
    } else {
      setTests(e.target.checked);
      console.log(`La valeur du Cours est : ${e.target.checked}`);
    }
    toast.success("Enregistré avec succès");
  };
  return (
    <>
      <tr>
        <td>19K2782</td>
        <td>KENNE NGNINPIA</td>
        <td>Roosvelt</td>
        <td>
          <input
            type="checkbox"
            name="cours"
            onChange={(e) => handleNotify(e, "cours")}
          />
        </td>
        <td>
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
