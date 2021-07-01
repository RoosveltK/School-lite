import React from "react";
const speciality = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];
const InfoPerso = ({ datas }) => {
  const { first_name, classes, email, matricule, username, born_at } = datas;

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
        <th>Niveau</th>
        <td>
          {classes.length != 0
            ? speciality.map((elt) => {
                if (elt.value == classes[0].level) return elt.name;
              })
            : null}
        </td>
      </tr>{" "}
      <tr>
        <th>Série</th>
        <td>{classes.length != 0 ? classes[0].speciality : null}</td>
      </tr>
      {/* <tr>
        <th>Details</th>
        <td>
          {" "}
          {classes.map((classe) => {
            let level;
            niveau.forEach((element, index) => {
              if (index + 1 === classe.level) {
                level = element;
              }
            });
            return level;
          })}
        </td>
      </tr> */}
    </>
  );
};
export default InfoPerso;
