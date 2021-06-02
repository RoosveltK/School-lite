import React from "react";
import ModalReadCours from "./modalReadCours";
import Link from "next/link";

const CadreCours = () => {
  return (
    <div className="caderCours">
      <header>INTRODUCTION AUX TIC</header>
      <div>
        Ce cours vous aidera a mieux comprendre ...
        <button className="btn">
          <Link href="cours/coursPerso">
            <a>Lire</a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CadreCours;
