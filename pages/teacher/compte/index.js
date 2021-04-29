import Image from "next/image";
import React from "react";
import LayoutT from "../../../components/LayoutT";

class Compte extends React.Component {
  render() {
    const couleur = {
      green: "#198754",
      red: "#dc3545",
      blue: "#0dcaf0",
    };
    return (
      <LayoutT title="Compte">
        <div className="container-fluid">
          <div className="mainCard">
            <section className="row">
              <div className="col-12 content-cardAccount">
                <div>
                  <Image
                    className="img-xs image"
                    src="/static/avatar.jpg"
                    alt="pic profile"
                    width={200}
                    height={200}
                  />
                  {/* <input type="file" /> */}
                </div>
                <div className="infoCompte">
                  <h3>
                    KENNE NGNINPIA <br />
                    Roosvelt
                  </h3>
                  <span>Roosvelt.kenne@gmail.com</span>
                  <span>29/04/2000</span>
                  <span>19K2782</span>
                  <span className="badge rounded-pill bg-success">
                    Informatique
                  </span>
                </div>
                <hr />
              </div>
            </section>
            <hr />
            <section className="row">
              <h2>Terminale D</h2>
              <div>
                <button className="btn boutonStat">COURS</button>
                <button className="btn boutonStat">TEST</button>
                <button className="btn boutonStat">EVALUATION</button>
              </div>
            </section>
            <hr />{" "}
            <section className="row">
              <h2>Premiere C</h2>
              <div>
                <button className="btn boutonStat">COURS</button>
                <button className="btn boutonStat">TEST</button>
                <button className="btn boutonStat">EVALUATION</button>
              </div>
            </section>
            <hr />{" "}
            <section className="row">
              <h2>Seconde C</h2>
              <div>
                <button className="btn boutonStat">COURS</button>
                <button className="btn boutonStat">TEST</button>
                <button className="btn boutonStat">EVALUATION</button>
              </div>
            </section>
            <hr />
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Compte;
