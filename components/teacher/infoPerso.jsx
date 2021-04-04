import React from "react";
import Head from "next/head";
import { Dropdown } from "react-bootstrap";

const InfoPerso = ({ datas }) => {
  const {
    id,
    last_name,
    first_name,
    classe,
    email,
    matricule,
    specialite,
    born_at,
  } = datas;

  return (
    <>
      <tr>
        <th>Matricule</th>
        <td>{matricule}</td>
      </tr>
      <tr>
        <th>Nom</th>
        <td>{`${last_name.toUpperCase()} ${first_name.toUpperCase()}`}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{email}</td>
      </tr>
      <tr>
        <th>Date de naissance</th>
        <td>{born_at}</td>
      </tr>
      <tr>
        <th>Spécialité</th>
        <td>{specialite}</td>
      </tr>
      <tr>
        <th>Details</th>
        <td>
          {/* <ul>
            {surv.present.map((explore) => {
              return (
                <li>
                  {" "}
                  `{explore.surv.matricule} | {explore.surv.nom}/{" "}
                  {explore.salle.code}/ {explore.Ue.code} :{explore.Ue.intitule}{" "}
                  - {explore.Horaire.date} / {explore.Horaire.begin} -{" "}
                  {explore.Horaire.end}`
                </li>
              );
            })}
          </ul> */}
        </td>
      </tr>
    </>
  );
};

export default InfoPerso;
