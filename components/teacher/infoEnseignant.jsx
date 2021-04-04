import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditTeacher from "./ModalEditTeacher";

const InfoEnseignant = ({ dataEnseignant }) => {
  const {
    id,
    last_name,
    first_name,
    email,
    matricule,
    classe,
    specialite,
  } = dataEnseignant;

  return (
    <>
      <tr>
        <td>{matricule}</td>
        <td>{`${last_name.toUpperCase()} ${first_name.toUpperCase()}`}</td>
        <td>{specialite}</td>
        <td>{email}</td>
        <td className="contextual-menu survDropdown">
          <Link href={`/enseignant/${id}`} key={id}>
            <a>Afficher</a>
          </Link>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <i className="bi bi-three-dots-vertical options-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="options">
              <ModalEditTeacher enseignant={dataEnseignant} />
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
