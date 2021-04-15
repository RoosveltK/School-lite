import React, { useState, useEffect } from "react";
import InfoEnseignant from "../../components/teacher/infoEnseignant";
import Layout from "../../components/Layout";
import ModalAddTeacher from "../../components/teacher/ModalAddTeacher";
import axios from "axios";
import $ from "jquery";

const Enseignant = ({ teachers, clas, specialite }) => {
  const [enseignant, setEnseignant] = useState([]);

  console.log(enseignant);
  useEffect(() => {
    setEnseignant(teachers);
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [1, 2, 3, 4] }],
      });
    });
  }, [teachers]);

  return (
    <>
      <Layout title="Enseignant">
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>ENSEIGNANTS({enseignant.length})</span>
                <ModalAddTeacher
                  specialite={specialite}
                  classes={clas}
                  title="Enseignant"
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
                    {enseignant.map((teacher) => {
                      return (
                        <InfoEnseignant
                          dataEnseignant={teacher}
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
};

export async function getStaticProps() {
  try {
    const teacher = await axios.get(`user`);
    const classe = await axios.get(`school/classe`);
    const special = await axios.get(`school/speciality`);

    const specialite = special.data;
    const clas = classe.data;
    const teachers = teacher.data;
    return { props: { teachers, clas, specialite } };
  } catch (err) {
    console.log(err);
    return { props: { post: [] } };
  }
}
export default Enseignant;
