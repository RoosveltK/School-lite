import React, { useState } from "react";
import InfoEnseignant from "../../../components/student/infoEleve";
import Layout from "../../../components/Layout";
import ModalAddStudent from "../../../components/student/ModalAddStudent";
import axiosInstance from "../../axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class Eleve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eleve: this.props.students,
    };
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [0, 3, 5] }],
      });
    });
  }
  render() {
    return (
      <>
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
                        <th>Spécialité</th>
                        <th>Email</th>
                        <th>Classe</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.eleve.map((student) => {
                        return (
                          <InfoEleve dataEleve={student} key={student.id} />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export async function getServerSideProps() {
  try {
    const student = await axiosInstance.get(`api/user`);
    const classe = await axiosInstance.get(`api/school/classe`);
    const special = await axiosInstance.get(`api/school/speciality`);
    // const users= await axiosInstance.get(`user:`)
    const specialite = special.data;
    const clas = classe.data;
    const students = student.data;
    return { props: { students, clas, specialite } };
  } catch (err) {
    console.log(err);
    return { props: { students: [], clas: [], specialite: [] } };
  }
}
export default Eleve;
