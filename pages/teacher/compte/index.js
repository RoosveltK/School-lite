import Image from "next/image";
import React from "react";
import LayoutT from "../../../components/LayoutT";

class Compte extends React.Component {
  state = {
    user:[],
  };

  componentDidMount() {
    // this.state.user = JSON.parse(localStorage.getItem("teacherInfo"));
    //this.setState({ user: res.data, isLoading: false }
  }
  render() {
    const couleur = {
      green: "#198754",
      red: "#dc3545",
      blue: "#0dcaf0",
    };
    return (
      <LayoutT title="Compte">
        <div className="container-fluid">
          <div className="mainCard">
            <section className="row">
              <div className="col-12 content-cardAccount">
                <div>
                  <Image
                    className="img-xs image"
                    src="/static/avatar.jpg"
                    alt="pic profile"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="infoCompte">
                  {/* <h3>
                    {this.state.user.username}
                    <br />
                    {this.state.user.first_name}
                  </h3>
                  <span> {this.state.user.email}</span>
                  <span> {this.state.user.born_at}</span>
                  <span> {this.state.user.matricule}</span>
                  <span className="badge rounded-pill bg-success">
                    {this.state.user.departement}
                  </span> */}
                </div>
                <hr />
              </div>
            </section>
            {/* <section className="row">
              {this.state.user.classes.map((info) => (
                <React.Fragment>
                  <h2>{info.level - info.speciality}</h2>
                  <div>
                    <button className="btn boutonStat">COURS</button>
                    <button className="btn boutonStat">TEST</button>
                    <button className="btn boutonStat">EVALUATION</button>
                  </div>
                </React.Fragment>
              ))}
            </section> */}
            <hr />
            <hr />{" "}
          </div>
        </div>
      </LayoutT>
    );
  }
}

export default Compte;
