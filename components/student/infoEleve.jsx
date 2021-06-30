import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import ModalDelete from "../ModalDelete";
import ModalEditStudent from "./ModalEditStudent";
import { BiDotsVertical } from "react-icons/bi";

const InfoEleve = ({ dataEleve, classeDispo, specialite, level }) => {
  //remettre classeDispo
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
      {role === 1 ? (
        <tr>
          <td>{matricule}</td>
          <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
          <td>{email}</td>
          <td>
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
          <td class="centerContent">{classes[0].speciality}</td>
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
                  specialite={specialite}
                  level={level}
                />
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
