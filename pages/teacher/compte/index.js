import Image from "next/image";
import React from "react";
import LayoutT from "../../../components/LayoutT";

const classeDispo = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];

class Compte extends React.Component {
  state = {
    user: null,
    classe: [],
  };

  componentDidMount() {
    const infoUser = JSON.parse(localStorage.getItem("teacherInfo"));
    const info = {
      username: infoUser.username,
      first_name: infoUser.first_name,
      matricule: infoUser.matricule,
      born_at: infoUser.born_at,
      email: infoUser.email,
    };

    this.setState({ user: info });
    let tab = infoUser.classes;
    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });
  }
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
                </div>
                {this.state.user != null ? (
                  <div className="infoCompte">
                    <h3>
                      {this.state.user.username.toUpperCase()}
                      <br />
                      {this.state.user.first_name.toUpperCase()}
                    </h3>
                    <span> {this.state.user.email}</span>
                    <span> {this.state.user.born_at}</span>
                    <span> {this.state.user.matricule}</span>
                    <span className="badge rounded-pill bg-success">
                      {this.state.user.departement}
                    </span>
                  </div>
                ) : null}
              </div>
            </section>
            <hr />
            <section className="row">
              {this.state.classe != null ? (
                <React.Fragment>
                  {this.state.classe.map((info) => (
                    <React.Fragment>
                      <h2>
                        {info.level} - {info.speciality}
                      </h2>
                      <div>
                        <button className="btn boutonStat">COURS</button>
                        <button className="btn boutonStat" disabled>
                          EVALUATION
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ) : null}
            </section>
            <hr />
          </div>
        </div>
      </LayoutT>
    );
  }
}

export default Compte;
        //  <div className="cader">
        //    {this.state.allLecon.map((lecon) => {
        //      if (lecon.status == true) return <CadreCours dataLecon={lecon} />;
        //    })}
        //  </div>;