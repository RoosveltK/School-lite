import React from "react";
import InfoEnseignant from "../../../components/teacher/infoEnseignant";
import Layout from "../../../components/Layout";
import ModalAddTeacher from "../../../components/teacher/ModalAddTeacher";
import axios from "axios";
import Router from "next/router";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Head from "next/head";
import Loader from "../../../components/Loader/LoaderWait";

class Enseignant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enseignant: this.props.teachers,
      user: 0,
    };
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [3, 5] }],
      });
    });

    const departements = [
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
    localStorage.setItem("departements", JSON.stringify(departement));

    if (localStorage.getItem("access_token") != null)
      this.setState({ user: 1 });
    else Router.push("/");
  }
  countTeacher = () => {
    let countS = 0;
    this.state.enseignant.forEach((element) => {
      if (element.role == "teach") countS += 1;
    });
    return countS;
  };
  render() {
    return (
      <>
        {this.state.user == 0 ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Enseignant">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span>ENSEIGNANTS({this.countTeacher()})</span>
                    <ModalAddTeacher classes={this.props.clas} />
                  </div>
                </header>
                <section className="row">
                  <div className="col-12 content-card">
                    <table
                      id="datatable"
                      className="table-responsive-sm nowrap "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Matricule</th>
                          <th>Nom</th>
                          <th>Spécialité</th>
                          <th>Email</th>
                          <th>Classes</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.enseignant.map((teacher) => {
                          return (
                            <InfoEnseignant
                              dataEnseignant={teacher}
                              classe={this.props.clas}
                              key={teacher.id}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
}

export async function getServerSideProps() {
  try {
    const teacher = await axios.get(`api/user`);
    const classe = await axios.get(`api/school/classe`);

    const clas = classe.data;
    const teachers = teacher.data;
    return { props: { teachers, clas } };
  } catch (err) {
    console.log(err);
    return {
      props: {
        teachers: [],
        clas: [],
      },
    };
  }
}
export default Enseignant;
