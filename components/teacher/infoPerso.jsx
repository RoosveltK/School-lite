import React from "react";
import { Dropdown } from "react-bootstrap";

const InfoPerso = ({ datas, departements }) => {
  const {
    first_name,
    classes,
    email,
    matricule,
    username,
    born_at,
    departement,
  } = datas;

  return (
    <>
      <tr>
        <th>Matricule</th>
        <td>{matricule}</td>
      </tr>
      <tr>
        <th>Nom</th>
        <td>{`${username.toUpperCase()} ${first_name.toUpperCase()}`}</td>
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
        <td>
          {departements.map((depts) => {
            if (depts.id == departement) return depts.name;
          })}
        </td>
      </tr>
      <tr>
        <th>Details</th>
        <td>
          <ul>
            {classes.map((clas) => (
              <li>{clas.level + "" + clas.speciality}</li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
};
export async function getServerSideProps() {
  try {
    const departs = axios.get(`api/user/departement`);
    departement = derparts.data;
  } catch {
    return { props: {} };
  }
}

export default InfoPerso;
