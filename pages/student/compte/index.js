import Image from "next/image";
import React from "react";
import LayoutS from "../../../components/LayoutS";
import axios from "axios";
import { GrValidate } from "react-icons/gr";
import CadreCoursT from "../../../components/user/teacher/cadreCoursT";
import PieChart from "../../../components/graphe/PieChart";
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
class Compte extends React.Component {
  state = {
    user: null,
    classe: [],
    isOk: false,
    classMater: [],
    programAllClass: [],
    test: [],
    programWithLecon: null,
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
  }

  avgByMatter = (idMatter) => {
    let moy = 0;
    let totalOccurences = 0;
    this.state.test.forEach((elemnt) => {
      if (elemnt.idMatter == idMatter) {
        moy += elemnt.note;
        totalOccurences += 1;
      }
    });
    return moy / totalOccurences;
  };

  loadOtherData = (classes, id) => {
    let tab = classes.slice();

    tab.forEach((elt) => {
      classeDispo.forEach((element) => {
        if (element.value == elt.level) elt.level = element.name;
      });
    });
    this.setState({ classe: tab });

    axios
      .get(`api/school/user/test/result/${id}`)
      .then((res) => {
        let tabProgLecon = [];
        this.setState({ test: res.data });
        this.props.program.forEach((prog) => {
          this.props.lecon.forEach((lecon) => {
            this.state.test.forEach((test) => {
              if (lecon.program == prog.id && test.lesson == lecon.id)
                tabProgLecon.push({
                  idProgram: prog.id,
                  idLecon: test.id,
                  programTitle: prog.title,
                  describe: prog.describe,
                  note: test.note,
                  matter: prog.matter,
                  idMatter: prog.matter,
                });
            });
          });
        });

        tabProgLecon.forEach((element) => {
          this.props.matiere.forEach((clas) => {
            departements.forEach((dep) => {
              if (element.matter == clas.id && dep.value == clas.matter)
                element.matter = dep.name;
            });
          });
        });
        this.setState({ programWithLecon: tabProgLecon });
      })
      .catch((err) => {
        this.setState({ programWithLecon: [] });
        console.log(err);
      });
  };

  obtainMatter = () => {
    // api/school/classe/matter/
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
            <section className="row">
              <h3>TESTS REALISES</h3>
              {this.state.programWithLecon != null ? (
                <React.Fragment>
                  {this.state.test.length == 0 ? (
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
                      {/* {this.state.programWithLecon.map((element) => {
                        return (
                          <h3>
                            {element.programTitle} - {element.note}
                          </h3>
                        );
                      })} */}
                      {/* <VerticalBar /> */}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <div className="loader"></div>
              )}
            </section>
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
