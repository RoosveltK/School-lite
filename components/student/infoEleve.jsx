import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditStudent from "./ModalEditStudent";
import { BiDotsVertical } from "react-icons/bi";

const InfoEleve = ({ dataEleve, classeDispo }) => {
  const { id, username, first_name, email, matricule, classes, role } =
    dataEleve;
  const getLevel = () => JSON.parse(localStorage.getItem("specialities"));

  return (
    <>
      {role == "stud" ? (
        <tr>
          <td>{matricule}</td>
          <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
          <td>{email}</td>
          <td>
            {getLevel().map((elt) => {
              if (elt.value == classes[0].level) return elt.name;
            })}
          </td>{" "}
          <td className="centerContent">{classes[0].speciality}</td>
          <td className="contextual-menu survDropdown">
            <Link href={`/admin/eleve/${id}`} key={id}>
              <a>Afficher</a>
            </Link>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                <BiDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu className="options">
                <ModalEditStudent eleve={dataEleve} classeDispo={classeDispo} />
                <Dropdown.Divider />
                <ModalDelete id={id} titre={"eleve"} />
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default InfoEleve;
