import React, { useState } from "react";
import InfoEnseignant from "../../components/student/infoEleve";
import Layout from "../../components/Layout";
import ModalAddStudent from "../../components/student/ModalAddStudent";
import axios from "axios";

const Eleve = (props) => {
  const [eleve, setEleve] = useState([]);
  return (
    <>
      <Layout title="Eleve">
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>ELEVES({eleve.length})</span>
                <ModalAddStudent title="Enseignant" />
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
                        <InfoEleve
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

export async function getServerSideProps() {
  try {
    const res = await axios.get(`user`);
    const student = res.data.data;
    return { props: { student } };
  } catch (err) {
    console.log(err);
    return { props: { post: [] } };
  }
}
export default Eleve;
