import React from "react";
import Layout from "../../../components/Layout";
import InfoPerso from "../../../components/student/infoPerso";
import axios from "axios";
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
class analyticPersonnel extends React.Component {
  state = {
    user: null,
    classe: [],
    isOk: false,
    allMatterOfClass: [],
    matter: null,
  };

  componentDidMount() {
    this.loadOtherData(this.props.post.classes, this.props.post.id);
    this.getAllTestByMatter(this.props.post.classes[0].id, this.props.post.id);
  }

  getAllTestByMatter = (classeID, userID) => {
    axios
      .get(`api/school/classe/matter/${classeID}`)
      .then((res) => {
        let tabTestByMatter = [];
        this.setState({ matter: res.data });
        if (this.state.matter.length == 0) this.setState({ isOk: true });
        res.data.forEach((elt, indexMatter) => {
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
                let nots = parseFloat(elt.note);
                tab.push({
                  id: elt.id,
                  note: nots.toFixed(2),
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
              if (indexMatter == this.state.matter.length - 1) {
                this.setState({ isOk: true });
              }
            })
            .catch((err) => {
              if (indexMatter == this.state.matter.length - 1) {
                this.setState({ isOk: true });
              }
            });
        });
      })
      .catch((err) => {
        this.setState({ allMatterOfClass: [] });
      });
  };

  percentOfMatter = (tabTest) => {
    let allNotes = 0;
    tabTest.forEach((elt) => {
      allNotes += parseFloat(elt.note);
    });
    allNotes = allNotes / tabTest.length;
    let percent = (allNotes * 100) / 20;
    percent = parseFloat(percent);
    return percent.toFixed(2);
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
      <>
        <Layout title={this.props.post.first_name}>
          <div className="container-fluid">
            <div className="mainCard">
              <header className="row">
                <div className="col-12 header-card">
                  <span>INFORMATIONS</span>
                </div>
              </header>
              <section className="row" style={{ height: "800px" }}>
                <div className="col-12 content-card">
                  {this.state.isOk != false ? (
                    <InfoPerso
                      dataStat={this.state.allMatterOfClass}
                      datas={this.props.post}
                      key={this.props.post.id}
                    />
                  ) : (
                    <div className="loader"></div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Layout>
        )
      </>
    );
  }
}

export async function getServerSideProps({ params }) {
  try {
    const mat = await axios.get(`api/school/matter`);
    const classes = await axios.get(`api/school/classe`);
    const lesson = await axios.get(`api/school/lecon`);
    const prog = await axios.get(`api/school/program`);
    const res = await axios.get(`api/user/${params.id}`);

    const post = res.data;
    const lecon = lesson.data;
    const matiere = mat.data;
    const classe = classes.data;
    const program = prog.data;

    return { props: { post, lecon, matiere, classe, program } };
  } catch (err) {
    console.log(err);
    return {
      props: { post: "", lecon: [], matiere: [], classe: [], program: [] },
    };
  }
}

export default analyticPersonnel;
