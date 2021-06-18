import React from "react";
import ModalReadCours from "./modalReadCours";
import Link from "next/link";

const CadreCours = () => {
  return (
    <div className="caderCours">
      <header>INTRODUCTION AUX TIC</header>
      <div>
        Ce cours vous aidera a mieux comprendre ...

        <div className="caderCours-btn">
          <button className="btn">
            <Link href="/student/cours/coursPerso">
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
