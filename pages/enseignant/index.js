import React, { useState } from "react";
import InfoEnseignant from "../../components/teacher/infoEnseignant";
import Layout from "../../components/Layout";
import ModalAddTeacher from "../../components/teacher/ModalAddTeacher";

const Enseignant = (props) => {
  const [enseignant, setEnseignant] = useState([]);
  return (
    <>
      <Layout title="Enseignant">
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>ENSEIGNANTS({enseignant.length})</span>
                <ModalAddTeacher title="Enseignant" />
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
                    </tr>
                  </thead>
                  <tbody>
                    {/* {surveillant.map((teacher) => {
                      return (
                        <InfoEnseignant
                          dataEnseignant={teacher}
                          key={teacher.id}
                        />
                      );
                    })} */}
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

export default Enseignant;
