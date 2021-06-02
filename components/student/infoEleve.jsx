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
  const niveau = [
    "Sixième",
    "Cinquième",
    "Quatrième",
    "Troisième",
    "Seconde",
    "Première",
    "Terminale",
  ];
  return (
    <>
      <tr>
        {role === 1 ? (
          <React.Fragment>
            <td>{matricule}</td>
            <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
            <td>{email}</td>
            <td position="center">
              {classes.map((classe) => {
                let level;
                niveau.forEach((element, index) => {
                  if (index + 1 === classe.level) {
                    level = element;
                  }
                });
                return level;
              })}
            </td>{" "}
            <td>{classes.map((classe) => classe.speciality)}</td>
            <td className="contextual-menu survDropdown">
              <Link href={`/admin/eleve/${id}`} key={id}>
                <a>Afficher</a>
              </Link>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <BiDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu className="options">
                  <ModalEditStudent
                    eleve={dataEleve}
                    classeDispo={classeDispo}
                  />
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
