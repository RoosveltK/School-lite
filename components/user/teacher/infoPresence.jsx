import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const InfoPresence = ({ dataStudent, idClasse }) => {
  const [cours, setCours] = useState(false);
  const [test, setTests] = useState(false);
  const { id, first_name, username, email, matricule, role, classes } =
    dataStudent;

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
      {role == "stud" && classes[0].id == idClasse ? (
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
          <td className="contextual-menu survDropdown">
            <Link href={`/teacher/presence/${id}`} key={id}>
              <a>Afficher</a>
            </Link>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default InfoPresence;
