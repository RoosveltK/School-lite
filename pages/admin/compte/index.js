import Layout from "../../../components/Layout";
import React from "react";
import axiosInstance from "../../axios";
import Router from "next/router";
import Loader from "../../loader";

export default class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        first_name: "",
        email: "",
        phone: "",
        role: null,
      },
      isloading: true,
    };
  }
  user = {
    username: "",
    first_name: "",
    email: "",
    phone: 0,
    role: 0,
  };
  async componentDidMount() {
    try {
      const res = await axiosInstance.get("users/currentuser");
      const { username, first_name, email, phone, role } = res.data.data;
      const user = {
        username: username.toUpperCase(),
        first_name: first_name.toUpperCase(),
        email,
        phone,
        role,
      };
      let loading = this.state.isloading;
      this.setState({ user, isloading: !loading });
    } catch (err) {
      // Router.push("/");
      console.log(err);
    }
  }
  handleModification({ lname, fname, adEmail, nPhone, role }) {
    axios
      .put("users/users/info", {
        username: lname,
        first_name: fname,
        email: adEmail,
        phone: nPhone,
        role,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const user = this.state.user;
    return (
      <Layout title="Compte">
        <div className="loadData">
          {this.state.isloading ? (
            <Loader />
          ) : (
            <div className="personalData">
              <header>
                <h2>Informations Personnelles</h2>
                <CustomModalModif
                  user={user}
                  onModification={this.handleModification}
                />
              </header>
              <div className="personalData-info">
                <span>Nom: </span>
                <span>{user.first_name}</span>
              </div>
              <div className="personalData-info">
                <span>Prenom: </span>
                <span>{user.username}</span>
              </div>
              <div className="personalData-info">
                <span>Email: </span>
                <span>{user.email}</span>
              </div>
              <div className="personalData-info">
                <span>Phone: </span>
                <span>{user.phone}</span>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}
