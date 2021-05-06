import React from "react";
import InfoEnseignant from "../../../components/teacher/infoEnseignant";
import Layout from "../../../components/Layout";
import ModalAddTeacher from "../../../components/teacher/ModalAddTeacher";
import axios from "axios";
import Router from "next/router";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class Enseignant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enseignant: this.props.teachers,
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
      </>
    );
  }
}

export async function getServerSideProps() {
  try {
    const teacher = await axios.get(`api/user`);
    const classe = await axios.get(`api/school/classe`);
    const special = await axios.get(`api/school/speciality`);
    const specialite = special.data;
    const clas = classe.data;
    const teachers = teacher.data;
    return { props: { teachers, clas, specialite } };
  } catch (err) {
    console.log(err);
    return { props: { teachers: [], clas: [], specialite: [] } };
  }
}
export default Enseignant;
