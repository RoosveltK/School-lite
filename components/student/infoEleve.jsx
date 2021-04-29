import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditTeacher from "./ModalEditStudent";
import ModalAddStudent from "./ModalAddStudent";

const InfoEleve = ({ dataEleve }) => {
  const {
    id,
    username,
    first_name,
    email,
    matricule,
    classes,
    specialite,
    departement,
  } = dataEleve;

  return (
    <>
      <tr>
        <td>{matricule}</td>
        <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
        <td>{specialite}</td>
        <td>{email}</td>
        <td>
          {classes.length !== 0
            ? classes.map((clas) => clas.level + "/" + clas.speciality)
            : null}
        </td>
        <td className="contextual-menu survDropdown">
          {/* <Link href={`/eleve/${id}`} key={id}>
            <a>Afficher</a>
          </Link> */}
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <i className="bi bi-three-dots-vertical options-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="options">
              <ModalEditStudent eleve={dataEleve} />
              <Dropdown.Divider />
              <ModalDelete id={id} titre={"eleve"} />
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};

export default InfoEleve;
