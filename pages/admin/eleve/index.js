import React from "react";
import Layout from "../../../components/Layout";
import ModalAddStudent from "../../../components/student/ModalAddStudent";
import InfoEleve from "../../../components/student/infoEleve";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Loader from "../../../components/Loader/LoaderWait";
import Router from "next/router";
import Head from "next/head";
import { dataEleve } from "../../../json/dataEleve";

class Eleve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eleve: this.props.students,
      user: 1, //remettre a 0 pour verifier l'auth
      count: 0,
    };
  }
  componentDidMount() {
    // if (localStorage.getItem("access_token") != null)
    //   this.setState({ user: 1 });
    // else
    //   Router.push("/");
    //
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [2, 3, 4, 5] }],
      });
    });
  }
  countStudent = () => {
    let countS = 0;
    dataEleve.forEach((element) => {
      if (element.role === 1) countS += 1;
    });
    return countS;
  };
  render() {
    return (
      <>
        {this.state.user === 0 ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Eleve">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span>ELEVES({this.countStudent()})</span>
                    <ModalAddStudent
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
                          <th>Email</th>
                          <th>Classe</th>
                          <th className="centerContent">Série</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.eleve.map((student) => (
                          <InfoEleve
                            dataEleve={student}
                            classeDispo={this.props.clas}
                            key={student.id}
                          />
                        ))}
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
    const student = await axios.get(`api/user`);
    const classe = await axios.get(`api/school/classe`);
    const special = await axios.get(`api/school/speciality`);

    const clas = classe.data;
    const students = student.data;
    const specialite = special.data;

    return { props: { students, clas, specialite } };
  } catch (err) {
    return { props: { students: [], clas: [], specialite: [] } };
  }
}
export default Eleve;
