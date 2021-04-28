import React from "react";
import InfoEnseignant from "../../../components/teacher/infoEnseignant";
import Layout from "../../../components/Layout";
import ModalAddTeacher from "../../../components/teacher/ModalAddTeacher";
import axiosInstance from "../../axios";
import Router from "next/router";
import "jquery/dist/jquery.min.js";
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
    // if (localStorage.getItem("access_token") == null) {
    //   Router.push("/");
    // }
    axiosInstance.get(`api/user/current_user`)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [0, 3, 5] }],
      });
    });
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.state.enseignant !== prevProps.teachers) {
      $("#datatable").DataTable().ajax.reload();
    }
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
    const teacher = await axiosInstance.get(`user`);
    const classe = await axiosInstance.get(`school/classe`);
    const special = await axiosInstance.get(`school/speciality`);
    // const users= await axiosInstance.get(`user:`)
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
