import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import InfoPresence from "../../../components/user/teacher/infoPresence";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import ModalSelect from "../../../components/user/teacher/ModalSelect";
import Loader from "../../../components/Loader/LoaderWait";
import Head from "next/head";

class Presence extends React.Component {
  state = {
    studentPresent: this.props.students,
    user: null,
    classe: null,
    isLoading: false,
  };

  componentDidMount() {
    if (localStorage.getItem("access_token") != null)
      this.setState({ isLoading: true });
    else Router.push("/");

    const infoUser = JSON.parse(localStorage.getItem("teacherInfo"));
    this.setState({ user: infoUser });
    // $(document).ready(function () {
    //   $("#datatable").DataTable({
    //     searching: true,
    //     paging: false,
    //     info: false,
    //     columnDefs: [{ orderable: false, targets: [2, 3] }],
    //   });
    // });
  }

  countStudent = () => {
    let countS = 0;
    if (this.state.classe != null) {
      this.state.studentPresent.map((element) => {
        if (
          element.role == "stud" &&
          element.classes[0].id == this.state.classe.id
        )
          countS += 1;
      });
      return countS;
    }
  };
  getInfo = (classe) => this.setState({ classe: classe });

  render() {
    return (
      <>
        {this.state.isLoading == false ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <LayoutT title="Presence">
            {this.state.user != null ? (
              <ModalSelect
                getChapterAndClass={this.getInfo}
                classes={this.state.user.classes}
              />
            ) : null}
            <div className="panneauStyle">
              <div className="panneauClasse">
                <SiGoogleclassroom size="20px" />{" "}
                <span>
                  {this.state.classe != null ? (
                    <React.Fragment>
                      {this.state.classe.level}-{this.state.classe.speciality}
                    </React.Fragment>
                  ) : null}
                </span>
              </div>
              <div id="triangle"></div>
            </div>
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span>LISTE PRESENCE({this.countStudent()})</span>
                  </div>
                </header>
                <section className="row">
                  <div className="table-responsive ">
                    <table
                      id="datatable"
                      className="table table-responsive table-striped "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                        marginBottom: "20px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Matricule</th>
                          <th>Nom</th>
                          <th className="centerContent">Cours</th>
                          <th className="centerContent">Test</th>
                          <th>Afficher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.classe != null ? (
                          <React.Fragment>
                            {this.state.studentPresent.map((student) => {
                              if (student.classes.length != 0) {
                                return (
                                  <InfoPresence
                                    dataStudent={student}
                                    key={student.id}
                                    idClasse={this.state.classe.id}
                                  />
                                );
                              }
                            })}
                          </React.Fragment>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </LayoutT>
        )}
      </>
    );
  }
}

export async function getServerSideProps() {
  try {
    const student = await axios.get(`api/user`);
    const students = student.data;

    return { props: { students } };
  } catch (err) {
    return { props: { students: [] } };
  }
}
export default Presence;
