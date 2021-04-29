import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import InfoPresence from "../../../components/teacher/infoPresence";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class Presence extends React.Component {
  state = {
    studentPresent: [],
  };
  componentDidMount() {
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [4, 5] }],
      });
    });
  }

  render() {
    return (
      <LayoutT title="Presence">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> <span>Classe 5</span>
          </div>
          <div id="triangle"></div>
          <h3 className="form-group">
            Titre :{" "}
            <select className="form-select">
              <option>Equations</option>
              <option>.</option>
              <option>..</option>
            </select>
          </h3>
        </div>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>LISTE PRESENCE({this.state.studentPresent.length})</span>
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
                    marginBottom: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Cours</th>
                      <th>Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {this.state.studentPresent.map((student) => {
                      return <INfo dataEnseignant={student} key={student.id} />;
                    })} */}
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                    <InfoPresence />
                  </tbody>
                </table>
              </div>
            </section>
            <div className="col-12 header-card">
              <span></span>
              <button type="submit" className="btn boutonT">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Presence;
