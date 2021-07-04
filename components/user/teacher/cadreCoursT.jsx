import React from "react";
import Link from "next/link";

const CadreCoursT = ({ dataLecon }) => {
  return (
    <div className="caderCours">
      <header>{dataLecon.title}</header>
      <div>
        {dataLecon.describe.length > 80
          ? `${dataLecon.describe.slice(0, 80)} ...`
          : dataLecon.describe}
        <div className="caderCours-btn">
          <button className="btn">
            <Link href={`/teacher/compte/${dataLecon.id}`}>
              <a>Modifier</a>
            </Link>
          </button>

          <button className="btn">
            <Link href={`/teacher/compte/test/${dataLecon.id}`}>
              <a>Voir Test</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadreCoursT;
