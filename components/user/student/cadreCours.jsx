import React from "react";
import Link from "next/link";

const CadreCours = ({ dataLecon }) => {
  return (
    <div className="caderCours">
      <header>{dataLecon.title}</header>
      <div>
        {dataLecon.description}
        <div className="caderCours-btn">
          <button className="btn">
            <Link href={`/student/cours/${dataLecon.id}`}>
              <a>Lire</a>
            </Link>
          </button>

          <button className="btn">
            <Link href="/student/tests">
              <a>Faire Test</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadreCours;
