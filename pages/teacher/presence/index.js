import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import InfoPresence from "../../../components/user/teacher/infoPresence";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class Presence extends React.Component {
  state = {
    studentPresent: this.props.students,
  };

  componentDidMount() {
    //this.state.studentPresent = this.props.students;
    axios
      .get(`api/user/current_user`)
      .then((res) => this.setState({ user: res.data, isLoading: false }))
      .catch((err) => console.log(err));

    $(document).ready(function () {
      $("#datatable").DataTable({
        searching: true,
        paging: false,
        info: false,
        columnDefs: [{ orderable: false, targets: [2, 3] }],
      });
    });
  }

  countStudent = () => {
    let countS = 0;
    this.state.studentPresent.map((element) => {
      if (element.role == "stud") countS += 1;
    });
    return countS;
  };
  render() {
    return (
      <LayoutT title="Presence">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> <span>Classe 5</span>
          </div>
          <div id="triangle"></div>
        </div>
        <div className="container-fluid">
          <div className="mainCard">
            <header className="row">
              <div className="col-12 header-card">
                <span>LISTE PRESENCE({this.countStudent()})</span>
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
                      <th className="centerContent">Cours</th>
                      <th className="centerContent">Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.studentPresent.map((student) => (
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

export async function getServerSideProps() {
  try {
    const student = await axios.get(`api/user`);
    const students = student.data;

    return { props: { students } };
  } catch (err) {
    return { props: { students: [] } };
  }
}
export default Presence;
