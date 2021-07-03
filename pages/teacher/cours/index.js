import React from "react";
import axios from "axios";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import Router from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import ModalSelectClasse from "../../../components/user/teacher/selectClasse";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/LoaderWait";
import Head from "next/head";

class Cours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      classe: null,
      program: [],
      isLoading: true,
      classes: null,
      chapitre: null,
      sendCours: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("access_token") != null) {
      this.setState({ isLoading: false });
    } else {
      Router.push("/");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sendCours: true });
    const data = {
      content: this.state.content,
      program: parseInt(this.state.chapitre.id),
    };

    axios
      .post(`api/school/lecon`, data)
      .then(() => {
        this.setState({ content: "" });
        toast.success("Cours ajouté avec succès");
      })
      .catch((err) => {
        if (err.response != undefined) toast.error(err.response.data.error);
        else toast.error("Echec lors  de la publication de la leçon");
      })
      .finally(() => this.setState({ sendCours: false }));
  };

  handleChange = (content, editor) => {
    this.setState({ content: content });
  };

  getInfo = (chap, classes) => {
    this.setState({ chapitre: chap });
    this.setState({ classe: classes });
  };

  render() {
    return (
      <LayoutT title="Cours">
        {this.state.isLoading ? (
          <React.Fragment>
            <Head>
              <title>School Lite</title>
            </Head>
            <Loader />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="panneauStyle">
              <div className="panneauClasse">
                <SiGoogleclassroom size="20px" />{" "}
                <span>
                  {this.state.classe != null
                    ? `${this.state.classe.level}-${this.state.classe.speciality}`
                    : null}
                </span>
              </div>
              <div id="triangle"></div>
              <h3 className="form-group noticeUploadCours text-danger font-weight-bold ">
                {this.state.chapitre != null
                  ? `Titre : ${this.state.chapitre.title}`
                  : null}
              </h3>
            </div>
            <ModalSelectClasse getChapterAndClass={this.getInfo} />
            <div className="container-fluid">
              <div className="mainCard">
                <section className="row">
                  <div className="col-12 content-card">
                    <div></div>
                    <form onSubmit={this.handleSubmit}>
                      <Editor
                        apiKey="0p57wtq8ihmq5rdl86lg5w6ph4kamw3z10pscm7wvic034n2"
                        init={{
                          selector: "textarea",
                          menubar: false,
                          height: 500,
                          plugins: "link image code",
                          icons: "thin",
                          toolbar:
                            "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code",
                        }}
                        onEditorChange={this.handleChange}
                        value={this.state.content}
                      />
                      <br />
                      <div className="col-12 header-card">
                        <span></span>
                        {this.state.sendCours == true ? (
                          <button disabled className="btn boutonT bntTeacher">
                            Patienter...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn boutonT bntTeacher"
                          >
                            Publier
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </React.Fragment>
        )}
      </LayoutT>
    );
  }
}

export default Cours;
