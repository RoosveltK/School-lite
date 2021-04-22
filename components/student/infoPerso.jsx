import React from "react";

const InfoPerso = ({ datas }) => {
  const {
    first_name,
    classes,
    email,
    matricule,
    departement,
    username,
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
        <td>{departement}</td>
      </tr>
      <tr>
        <th>Details</th>
        <td>
          <ul>
            {classes.map((clas) => (
              <li>{clas.level + "/" + clas.speciality}</li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
};

export default InfoPerso;
