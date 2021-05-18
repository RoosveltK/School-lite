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
    if (localStorage.getItem("access_token") != null) {
      this.setState({ user: 1 });
    } else {
      Router.push("/");
    }
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [3, 5] }],
      });
    });
  }
  render() {
    return (
      <>
        {this.state.user === 0 ? (
          <React.Fragment>
            <Head>
              <title>School online</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Enseignant">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span>ENSEIGNANTS({this.state.enseignant.length})</span>
                    <ModalAddTeacher
                      specialite={this.props.specialite}
                      classes={this.props.clas}
                    />
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
                              specialite={this.props.specialite}
                              classe={this.props.clas}
                              departementPerso={this.props.departement}
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
    const special = await axios.get(`api/school/speciality`);
    const departs = await axios.get(`api/user/departement`);

    const specialite = special.data;
    const clas = classe.data;
    const teachers = teacher.data;
    const departement = departs.data;
    return { props: { teachers, clas, specialite, departement } };
  } catch (err) {
    console.log(err);
    return {
      props: { teachers: [], clas: [], specialite: [], departement: [] },
    };
  }
}
export default Enseignant;
