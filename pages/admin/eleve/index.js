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

class Eleve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eleve: this.props.students,
      user: null,
    };
  }
  componentDidMount() {
    axios
      .get(`api/user/currentuser`)
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => Router.push("/"));
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
        {this.state.user === null ? (
          <React.Fragment>
            <Head>
              <title>School online</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <Layout title="Eleve">
            <div className="container-fluid">
              <div className="mainCard">
                <header className="row">
                  <div className="col-12 header-card">
                    <span>ELEVES({this.state.eleve.length})</span>
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
                          <th>Série</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.eleve.map((student) => (
                          <InfoEleve
                            dataEleve={student}
                            specialite={this.props.specialite}
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

    const specialite = special.data;
    const clas = classe.data;
    const students = student.data;
    return { props: { students, clas, specialite } };
  } catch (err) {
    return { props: { students: [], clas: [], specialite: [] } };
  }
}
export default Eleve;
