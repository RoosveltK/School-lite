import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "./customToggle";
import Link from "next/link";

const InfoCours = () => {
  return (
    <>
      <tr>
        <td>1</td>
        <td>KN ROOS</td>
        <td>
          <button className="btn btn-secondary">Test</button>{" "}
          <button className="btn btn-secondary">Voir cours</button>
        </td>
        <td>
          {" "}
          <input type="checkbox" />
        </td>
      </tr>
    </>
  );
};

export default InfoCours;
