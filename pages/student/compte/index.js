import Image from "next/image";
import React from "react";
import LayoutS from "../../../components/LayoutS";
import axios from "axios";
import { GrValidate } from "react-icons/gr";
import CadreCoursT from "../../../components/user/teacher/cadreCoursT";
import VerticalBar from "../../../components/graphe/VerticalBar";

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

const backgroundColor = [
  "rgba(255, 99, 132)",
  "rgba(255, 159, 64)",
  "rgba(255, 205, 86)",
  "rgba(75, 192, 192)",
  "rgba(54, 162, 235)",
  "rgba(153, 102, 255)",
  "rgba(201, 203, 207)",
  "rgba(200, 210, 192)",
  "rgba(10, 51, 235)",
  "rgba(100, 5, 255)",
  "rgba(200, 10, 207)",
];

class Compte extends React.Component {
  state = {
    user: null,
    classe: [],
    isOk: false,
    classMater: [],
    programWithLecon: null,
    allMatterOfClass: null,
    matter: [],
  };
  componentDidMount() {
    const infoUser = JSON.parse(localStorage.getItem("studentInfo"));
    const info = {
      username: infoUser.username,
      first_name: infoUser.first_name,
      matricule: infoUser.matricule,
      born_at: infoUser.born_at,
      email: infoUser.email,
      id: infoUser.id,
    };
    this.setState({ user: info });
    this.loadOtherData(infoUser.classes, infoUser.id);
    this.getAllTestByMatter(infoUser.classes[0].id, infoUser.id);
  }

  getAllTestByMatter = (classeID, userID) => {
    axios
      .get(`api/school/classe/matter/${classeID}`)
      .then((res) => {
        let tabTestByMatter = [];
        this.setState({ matter: res.data });
        res.data.forEach((elt) => {
          axios
            .get(`api/school/user/test/matter/${userID}/${elt.id}`)
            .then((res) => {
              let tab = [];
              res.data.forEach((elt) => {
                const lecons = this.props.lecon.find(
                  (lecon) => lecon.id == elt.lesson
                );
                const programs = this.props.program.find(
                  (prog) => prog.id == lecons.program
                );
                tab.push({
                  id: elt.id,
                  note: elt.note,
                  programTitle: programs.title,
                  describe: programs.describe,
                });
              });
              tabTestByMatter.push({ matiere: elt.matter, tests: tab });

              tabTestByMatter.forEach((elt) => {
                if (elt.tests.length != 0)
                  elt.pourcentage = this.percentOfMatter(elt.tests);
                else elt.pourcentage = 0;
                departements.forEach((dep) => {
                  if (dep.value.localeCompare(elt.matiere) == 0)
                    elt.matiere = dep.name;
                });
              });
              this.setState({ allMatterOfClass: tabTestByMatter });
              if (
                this.state.allMatterOfClass.length ==
                  this.state.matter.length &&
                this.state.matter.length != 0
              ) {
                this.setState({ isOk: true });
              }
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        this.setState({ allMatterOfClass: [] });
      });
  };

  percentOfMatter = (tabTest) => {
    let allNotes = 0;
    tabTest.forEach((elt) => {
      allNotes += elt.note;
    });
    allNotes = allNotes / tabTest.length;
    return (allNotes * 100) / 20;
  };

  loadOtherData = (classes, id) => {
    let tab = classes.slice();

    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });
  };

  render() {
    return (
      <LayoutS title="Compte">
        <div className="container-fluid">
          <div className="mainCard">
            <section className="row">
              <div className="col-12 content-cardAccount">
                <div>
                  <Image
                    className="img-xs image"
                    src="/static/student.png"
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
                      {this.state.classe[0].level} {"  "}
                      {this.state.classe[0].speciality}
                    </span>
                  </div>
                ) : null}
              </div>
            </section>
            <hr />
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h3>Taux de réussite</h3>
              {this.state.allMatterOfClass != null ? (
                <React.Fragment>
                  {this.state.allMatterOfClass == 0 ? (
                    <h3
                      style={{
                        marginLeft: "20px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "50px",
                        color: "gray",
                      }}
                    >
                      VOUS N'AVEZ ENCORE PARTICIPE A AUCUN TEST
                    </h3>
                  ) : (
                    <React.Fragment>
                      {this.state.isOk == false ? null : (
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "50%",
                          }}
                        >
                          <VerticalBar dataStat={this.state.allMatterOfClass} />
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <div className="loader"></div>
              )}
            </div>
          </div>
        </div>
      </LayoutS>
    );
  }
}

export async function getServerSideProps() {
  try {
    const mat = await axios.get(`api/school/matter`);
    const classes = await axios.get(`api/school/classe`);
    const lesson = await axios.get(`api/school/lecon`);
    const prog = await axios.get(`api/school/program`);

    const lecon = lesson.data;
    const matiere = mat.data;
    const classe = classes.data;
    const program = prog.data;

    return { props: { lecon, matiere, classe, program } };
  } catch (err) {
    console.log(err);
    return {
      props: {
        lecon: [],
        matiere: [],
        classe: [],
        program: [],
      },
    };
  }
}

export default Compte;
