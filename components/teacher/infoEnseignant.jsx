import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditTeacher from "./ModalEditTeacher";

const InfoEnseignant = ({ dataEnseignant, specialite, classe }) => {
  const {
    id,
    first_name,
    username,
    email,
    matricule,
    classes,
    departement,
  } = dataEnseignant;

  return (
    <>
      <tr>
        <td>{matricule}</td>
        <td>{`${first_name.toUpperCase()}`}</td>
        <td>{departement}</td>
        <td>{email}</td>
        <td>
          {classes.length !== 0
            ? classes.map((clas) => clas.level + "/" + clas.speciality)
            : null}
        </td>
        <td className="contextual-menu survDropdown">
          <Link href={`/enseignant/${id}`} key={id}>
            <a>Afficher</a>
          </Link>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <i className="bi bi-three-dots-vertical options-icon">loj </i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="options">
              <ModalEditTeacher
                enseignant={dataEnseignant}
                specialite={specialite}
                classe={classe}
              />
              <Dropdown.Divider />
              <ModalDelete id={id} titre={"enseignant"} />
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};

export default InfoEnseignant;
