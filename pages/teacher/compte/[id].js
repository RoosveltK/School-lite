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
      content: this.props.lecon.content,
      classe: null,
      program: [],
      classes: null,
      chapitre: null,
      sendCours: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sendCours: true });
    const data = {
      content: this.state.content,
      program: parseInt(this.props.lecon.program),
    };

    axios
      .put(`api/school/lecon/${this.props.lecon.id}`, data)
      .then(() => {
        toast.success("Cours modifié avec succès");
      })
      .catch((err) => {
        if (err.response != undefined) toast.error(err.response.data.error);
        else toast.error("Erreur lors  de la modification de la leçon");
      })
      .finally(() => this.setState({ sendCours: false }));
  };

  handleChange = (content, editor) => {
    this.setState({ content: content });
  };

  render() {
    return (
      <LayoutT title="Cours">
        <React.Fragment>
          <div className="panneauStyle">
            <h3 className="form-group noticeUploadCours text-danger font-weight-bold ">
              Titre : {this.props.program.title}
            </h3>
          </div>
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
                          Modifier
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </React.Fragment>
      </LayoutT>
    );
  }
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`api/school/lecon_by_program/${params.id}`);
    const prog = await axios.get(`api/school/program/${params.id}`);

    const lecon = res.data;
    const program = prog.data;

    return { props: { lecon, program } };
  } catch (err) {
    console.log(err);
    return { props: { lecon: "", program: "" } };
  }
}

export default Cours;
