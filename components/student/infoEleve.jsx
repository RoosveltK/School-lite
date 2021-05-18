import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditStudent from "./ModalEditStudent";
import { BiDotsVertical } from "react-icons/bi";

const InfoEleve = ({ dataEleve, specialite }) => {
  const {
    id,
    department,
    username,
    first_name,
    email,
    matricule,
    classes,
    role,
  } = dataEleve;

  return (
    <>
      <tr>
        {role == 2 ? (
          <React.Fragment>
            <td>{matricule}</td>
            <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
            <td>{email}</td>
            <td>{classes}</td>
            <td className="contextual-menu survDropdown">
              <Link href={`/admin/eleve/${id}`} key={id}>
                <a>Afficher</a>
              </Link>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <BiDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu className="options">
                  <ModalEditStudent eleve={dataEleve} />
                  <Dropdown.Divider />
                  <ModalDelete id={id} titre={"eleve"} />
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </React.Fragment>
        ) : null}
      </tr>
    </>
  );
};

export default InfoEleve;
