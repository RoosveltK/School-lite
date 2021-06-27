import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import CustomToggle from "../customToggle";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const InfoCours = ({ dataCours }) => {
  const { id, title, status, course_day, limit_day } = dataCours;
  const [val, setVal] = useState(null);
  const handleChange = (e) => {
    setVal(e.target.checked);
    axios.get(`api/school/active_or_desactive/${id}`).then(() => {
      if (e.target.checked) toast.success(`Programme activé`);
      else toast.warning(`Programme désactivé`);
    });
  };
  return (
    <>
      <tr>
        <td>{title}</td>
        <td align="center">{course_day}</td>
        <td>{limit_day}</td>
        <td class="centerContent">
          <input
            type="checkbox"
            defaultChecked={status}
            onChange={handleChange}
          />
        </td>
        <td>
          {status === true ? (
            <React.Fragment>
              <Link href={`/admin/cours/test/${id}`} key={id}>
                <a className="badge rounded-pill bg-success badgeCours">Test</a>
              </Link>{" "}
              <Link href={`/admin/cours/${id}`} key={id}>
                <a className="badge rounded-pill bg-success badgeCours">
                  Voir cours
                </a>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <a className="badge rounded-pill bg-secondary badgeCoursDesactivate">
                Test
              </a>
              <a className="badge rounded-pill bg-secondary badgeCoursDesactivate">
                Voir cours
              </a>
            </React.Fragment>
          )}
        </td>
      </tr>
    </>
  );
};

export default InfoCours;
