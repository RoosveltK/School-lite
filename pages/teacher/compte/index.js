import Image from "next/image";
import React from "react";
import LayoutT from "../../../components/LayoutT";
import axios from "axios";
import CadreCoursT from "../../../components/user/teacher/cadreCoursT";

const classeDispo = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];

const departements = [
  { value: "math", name: "Mathématique" },
  { value: "phy", name: "Physique" },
  { value: "chim", name: "Chimie" },
  { value: "hist", name: "Histoire" },
  { value: "geo", name: "Géographie" },
  { value: "eng", name: "Anglais" },
  { value: "fr", name: "Français" },
  { value: "svt", name: "Science" },
  { value: "ecm", name: "ECM" },
  { value: "eps", name: "Sport" },
  { value: "inf", name: "Informatique" },
];

class Compte extends React.Component {
  state = {
    user: null,
    classe: [],
    isOk: false,
    classMater: [],
    programAllClass: [],
  };

  componentDidMount() {
    const infoUser = JSON.parse(localStorage.getItem("teacherInfo"));
    const info = {
      username: infoUser.username,
      first_name: infoUser.first_name,
      matricule: infoUser.matricule,
      born_at: infoUser.born_at,
      email: infoUser.email,
      departement: infoUser.departement,
    };

    this.setState({ user: info });
    let tab = infoUser.classes;
    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });

    infoUser.classes.map((elt, index) => {
      let i = 0;

      axios
        .get(`api/school/classe/matter/${elt.id}`)
        .then((res) => {
          const matter = res.data.find(
            (val) => infoUser.departement == val.matter
          );
          if (matter != undefined) {
            this.setState({ classMater: [...this.state.classMater, matter] });
            const taille = infoUser.classes.length - 1;
            if (index == taille) {
              this.state.classMater.forEach((prog, indice) => {
                axios
                  .get(`api/school/program/matter/${prog.id}`)
                  .then((res) => {
                    res.data.forEach((datas) => {
                      datas.idClasse = prog.classe;
                      this.setState({
                        programAllClass: [...this.state.programAllClass, datas],
                      });
                    });
                    if (indice == this.state.classMater.length - 1)
                      this.setState({ isOk: true });
                  })
                  .catch((err) => console.log(err));
              });
            }
          }
        })
        .catch((err) => console.log(err));
    });
  }

  render() {
    return (
      <LayoutT title="Compte">
        <div className="container-fluid">
          <div className="mainCard">
            <section className="row">
              <div className="col-12 content-cardAccount">
                <div>
                  <Image
                    className="img-xs image"
                    src="/static/teacher.png"
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
                      {departements.map((elt) => {
                        if (elt.value == this.state.user.departement)
                          return elt.name;
                      })}
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
                      </h2>{" "}
                      <div className="cader">
                        {this.state.isOk == false ? (
                          <div className="loader"></div>
                        ) : (
                          <React.Fragment>
                            {this.state.programAllClass.map(
                              (program, index) => {
                                let isThere = false;
                                if (
                                  program.idClasse == info.id &&
                                  program.status == true
                                ) {
                                  isThere = true;
                                  return <CadreCoursT dataLecon={program} />;
                                }
                              }
                            )}
                          </React.Fragment>
                        )}
                      </div>
                      <hr />
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
