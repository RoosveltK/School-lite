import React from "react";
import Head from "next/head";
import Image from "next/image";
import { responsbar, respons } from "../scripts/form";
import { Dropdown } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import CustomToggle from "./customToggle";
import Link from "next/link";
import { Router } from "next/router";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
  }

  componentDidMount() {
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
              <div className="sidebar-heading">
                <Link href="enseignant">
                  <a className="homeLink">SCHOOL ONLINE</a>
                </Link>
              </div>
              <div className="list-group list-group-flush" id="menuLoading">
                <Link href="cours">
                  <a
                    className={`list-group-item list-group-item-action bg-light top`}
                  >
                    COURS
                  </a>
                </Link>{" "}
                <Link href="eleve">
                  <a
                    className={`list-group-item list-group-item-action bg-light `}
                  >
                    ELEVES
                  </a>
                </Link>
                <Link href="enseignant">
                  <a
                    className={`list-group-item list-group-item-action bg-light `}
                  >
                    ENSEIGNANTS{" "}
                  </a>
                </Link>
                <Link href="tests">
                  <a
                    className={`list-group-item list-group-item-action bg-light `}
                  >
                    TESTS
                  </a>
                </Link>
                <Link href="programme">
                  <a
                    className={`list-group-item list-group-item-action bg-light `}
                  >
                    PROGRAMMES
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
                  <form role="search" className="menuSearch">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="form-control"
                    />
                    <a href="enseignant">
                      <i className="fa fa-search"></i>
                    </a>
                  </form>
                </div>
                <div className="logo-textL">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                      <Image
                        className="img-xs image"
                        src="/static/avatar.jpg"
                        alt="pic profile"
                        width={40}
                        height={40}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link href="/admin/compte">
                          <a>Compte</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Déconnexion</Dropdown.Item>
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

export default Layout;
