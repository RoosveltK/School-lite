import React, { useState } from "react";

const speciality = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];

const departements = [
  { value: "math", name: "Mathématique" },
  { value: "phy", name: "Physique" },
  { value: "chim", name: "Chimie" },
  { value: "hist", name: "Histoire" },
  { value: "geo", name: "Géographie" },
  { value: "en", name: "Anglais" },
  { value: "fr", name: "Français" },
  { value: "svt", name: "Science" },
  { value: "ecm", name: "ECM" },
  { value: "eps", name: "Sport" },
  { value: "inf", name: "Informatique" },
];

const InfoPerso = ({ datas }) => {
  const [tabState, setTable] = useState([]);
  const {
    first_name,
    classes,
    email,
    matricule,
    username,
    born_at,
    departement,
  } = datas;

  React.useEffect(() => {
    let tab = [];
    classes.map((clas) => {
      speciality.map((elt) => {
        if (elt.value == clas.level) {
          const elts = {
            name: elt.name,
            special: clas.speciality,
          };
          tab.push(elts);
        }
      });
    });
    const tab1 = tab.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    setTable(tab1);
  }, []);
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
          {departements.map((elt) => {
            if (elt.value == departement) return elt.name;
          })}
        </td>
      </tr>
      <tr>
        <th>Classes</th>
        <td>
          <ul>
            {tabState.map((clas) => (
              <li>{clas.name + " - " + clas.special}</li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
};

export default InfoPerso;
