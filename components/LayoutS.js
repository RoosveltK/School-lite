import React from "react";
import Head from "next/head";
import Image from "next/image";
import { responsbar, respons } from "../scripts/form";
import { Dropdown } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { MdSupervisorAccount } from "react-icons/md";
import CustomToggle from "./customToggle";
import Link from "next/link";
import Router from "next/router";
import ModalHelp from "./help/ModalHelp";

class LayoutS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      active: "",
      tabHelp: [
        {
          id: 0,
          msg: "Bienvenue sur School lite",
        },
        {
          id: 2,
          msg: "Pour accéder aux cours veuillez sélectionner une matière et patientew un instant",
        },
      ],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("studentInfo") != null)
      this.setState({
        user: JSON.parse(localStorage.getItem("studentInfo")),
      });
    responsbar();
    respons();
  }

  render() {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div>
          <div className="topbar"></div>
          <div className="d-flex" id="wrapper">
            <div className="bg-light border-right" id="sidebar-wrapper">
              <div className="sidebar-heading ">
               <Link href="/admin/enseignant">
                  <a className="homeLink">SCHOOL LITE</a>
                </Link>
                <Link href="/student/cours">
                  <a className="homeLink">
                    <Image
                      src="/static/school.png"
                      alt="pic profile"
                      width={30}
                      height={30}
                    />
                  </a>
                </Link>
                <div className="bar"></div>
                <span className="devise">Discipline - Travail - Succès</span>
              </div>
              <div className="list-group list-group-flush" id="menuLoading">
                <Link href="/student/cours">
                  <a
                    className={`list-group-item list-group-item-action bg-light top`}
                  >
                    COURS{" "}
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex-1" id="page-content-wrapper">
              <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-col">
                <div className="logo-menu">
                  <div id="icon-menu">
                    <AiOutlineMenu />
                  </div>
                </div>
                <div className="logo-textL">
                  <Dropdown className="logoSpace">
                    <Dropdown.Toggle as={CustomToggle}>
                      <Image
                        className="img-xs image"
                        src="/static/student.png"
                        alt="pic profile"
                        width={40}
                        height={40}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {this.state.user != "" ? (
                          <div className="centerContent">
                            {this.state.user.first_name.toUpperCase()}
                            <br />
                            <span style={{ fontSize: "11px" }}>(Élève)</span>
                          </div>
                        ) : null}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <ModalHelp tabHelp={this.state.tabHelp} />
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          Router.push("/student/compte");
                        }}
                      >
                        <MdSupervisorAccount size="20px" />
                        Compte
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          localStorage.clear();
                          Router.push("/");
                        }}
                      >
                        {" "}
                        <CgLogOut size="20px" />
                        Déconnexion
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </nav>
              <div className="main" id="interface">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LayoutS;
