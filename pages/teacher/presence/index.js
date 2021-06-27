import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import InfoPresence from "../../../components/user/teacher/infoPresence";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { dataPresence } from "../../../json/dataPresence";

class Presence extends React.Component {
  state = {
    studentPresent: [],
  };

  componentDidMount() {
    axios
      .get(`api/user/current_user`)
      .then((res) => this.setState({ user: res.data, isLoading: false }))
      .catch((err) => console.log(err));
    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [3, 4] }],
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
                <span>LISTE PRESENCE({dataPresence.length})</span>
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
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th class="centerContent">Cours</th>
                      <th class="centerContent">Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPresence.map((student) => (
                      <InfoPresence dataStudent={student} key={student.id} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Presence;
