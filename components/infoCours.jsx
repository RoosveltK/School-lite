import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import CustomToggle from "./customToggle";
import Link from "next/link";

const InfoCours = () => {
  return (
    <>
      <tr>
        <td>1</td>
        <td>KN ROOS</td>
        <td colSpan="">
          <button className="btn boutonT">Test</button>{" "}
          <button className="btn boutonT">Voir cours</button>
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
