import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import axios from "axios";

const InfoCours = () => {
  const [val, setVal] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.checked);
  };
  return (
    <>
      <tr>
        <td align="center">1</td>
        <td>KN ROOS</td>
        <td align="center">
          <input type="checkbox" onChange={handleChange} />
        </td>
        <td>
          <Link href="/">
            <a className="badge rounded-pill bg-success badgeCours">Test</a>
          </Link>{" "}
          <Link href="/">
            <a className="badge rounded-pill bg-success badgeCours">
              Voir cours
            </a>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default InfoCours;
