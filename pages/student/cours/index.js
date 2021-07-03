import React, { Component } from "react";
import LayoutS from "../../../components/LayoutS";
import CadreCours from "../../../components/user/student/cadreCours";
import axios from "axios";

const departement = [
  { value: "math", name: "Mathématique" },
  { value: "phy", name: "Physique" },
  { value: "chim", name: "Chimie" },
  { value: "hist", name: "Histoire" },
  { value: "geo", name: "Géographie" },
  { value: "en", name: "Anglais" },
  { value: "fr", name: "Français" },
  { value: "svt", name: "Science" },
  { value: "ecm", name: "ECM" },
  { value: "eps", name: "Sport" },
  { value: "inf", name: "Informatique" },
];
class Cours extends Component {
  state = {
    allLecon: [],
    matiere: [],
    matiereSelect: null,
    user: null,
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("studentInfo"));
    let idClasse = data.classes;

    axios
      .get(`api/school/classe/matter/${idClasse[0].id}`)
      .then((res) => {
        this.setState({ matiere: res.data });

        let tab = this.state.matiere.slice();
        tab.forEach((val) => {
          let matter = departement.find((elt) => elt.value == val.matter);
          val.matter = matter.name;
        });
        this.setState({ matiere: tab });
        console.log(this.state.matiere);
      })
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.matiereSelect != this.state.matiereSelect) {
      axios
        .get(`api/school/program/matter/${this.state.matiereSelect}`)
        .then((res) => {
          this.setState({ allLecon: res.data });
        });
    }
  }

  render() {
    return (
      <LayoutS title="Cours">
        <div className="firstCader">
          <select
            onChange={(e) =>
              this.setState({ matiereSelect: parseInt(e.target.value) })
            }
            className="form-select custom-select d-flex justify-content-center"
          >
            <option>Sélectionner une matiere</option>
            {this.state.matiere.map((mat, index) => (
              <option key={index} value={mat.id}>
                {mat.matter}
              </option>
            ))}
          </select>
        </div>
        {this.state.allLecon.length == 0 ? (
          <div className="firstCader">
            <div className="container-fluid">
              <div className="mainCard textCours text-secondary">
                Pour accéder aux cours vous devez impérativement séléctionner
                une matière
              </div>
            </div>
          </div>
        ) : (
          <div className="cader">
            {this.state.allLecon.map((lecon) => {
              if (lecon.status == true) return <CadreCours dataLecon={lecon} />;
            })}
          </div>
        )}
      </LayoutS>
    );
  }
}
export default Cours;
