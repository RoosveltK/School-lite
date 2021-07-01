import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditTeacher from "./ModalEditTeacher";
import { BiDotsVertical } from "react-icons/bi";

const InfoEnseignant = ({ dataEnseignant, classe }) => {
  const { id, first_name, email, matricule, departement, classes, role } =
    dataEnseignant;

  return (
    <>
      {role == "teach" ? (
        <tr>
          <td>{matricule}</td>
          <td>{`${first_name.toUpperCase()}`}</td>
          <td>{departement}</td>
          <td>{email}</td>
          <td>
            {classes.length != 0
              ? classes.map((clas) => clas.level + "-" + clas.speciality + "/")
              : null}
          </td>
          <td className="contextual-menu survDropdown">
            <Link href={`/admin/enseignant/${id}`} key={id}>
              <a>Afficher</a>
            </Link>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                <BiDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu className="options">
                <ModalEditTeacher enseignant={dataEnseignant} classe={classe} />
                <Dropdown.Divider />
                <ModalDelete id={id} titre={"enseignant"} />
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default InfoEnseignant;
