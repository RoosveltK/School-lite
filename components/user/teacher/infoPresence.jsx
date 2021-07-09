import React, { useState } from "react";
import { toast } from "react-toastify";

const InfoPresence = ({ dataStudent }) => {
  const [cours, setCours] = useState(false);
  const [test, setTests] = useState(false);
  const { id, first_name, username, email, matricule, role } = dataStudent;

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
      {role == "stud" ? (
        <tr>
          <td>{matricule}</td>
          <td>
            {first_name.toUpperCase()} {username.toUpperCase()}
          </td>
          <td className="centerContent">
            <input
              type="checkbox"
              name="cours"
              onChange={(e) => handleNotify(e, "cours")}
            />
          </td>
          <td className="centerContent">
            <input
              type="checkbox"
              name="tests"
              onChange={(e) => handleNotify(e, "tests")}
            />
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default InfoPresence;
