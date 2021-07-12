import React from "react";
import VerticalBar from "../graphe/VerticalBar";

const speciality = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];
const InfoPerso = ({ datas, dataStat }) => {
  const { first_name, classes, email, matricule, username, born_at } = datas;

  return (
    <>
      <table
        id="datatable"
        className="table dt-responsive nowrap"
        style={{
          borderCollapse: "collapse",
          borderSpacing: 0,
          width: "100%",
        }}
      >
        <tbody>
          {" "}
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
            <td>{classes[0].level}</td>
          </tr>
          <tr>
            <th>Série</th>
            <td>{classes.length != 0 ? classes[0].speciality : null}</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          width: "400px",
          height: "200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <VerticalBar dataStat={dataStat} />
      </div>
    </>
  );
};
export default InfoPerso;
