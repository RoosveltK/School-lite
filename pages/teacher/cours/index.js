import React from "react";
import axios from "axios";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import { Editor } from "@tinymce/tinymce-react";
import ModalSelectClasse from "../../../components/user/teacher/selectClasse";
import { toast } from "react-toastify";
import Loaders from "../../loader";

class Cours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      new: 0,
      content: "",
      lecon: "",
      classe: "",
      program: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`api/user/current_user`)
      .then((res) => this.setState({ user: res.data, isLoading: false }))
      .catch((err) => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      content: this.state.cours,
      program: parseInt(this.state.lecon),
    };
    if (this.state.new == 0) {
      axios
        .post(`api/school/lecon`, data)
        .then(() => toast.success("Cours ajouté avec succès"))
        .catch(() => toast.error("Echec lors de la publication du cours "));
    } else {
      axios
        .put(`api/school/lecon/${this.state.lecon}`, data)
        .then(() => toast.success("Cours Modifié avec succès"))
        .catch(() => toast.error("Echec lors de la modification du cours "));
    }
    console.log(data);
  };

  handleChange = (content, editor) => {
    this.setState({ content: content });
  };

  getInfo = (classes) => {
    this.setState({ classe: classes });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.program !== prevState.program) {
      try {
        const contentCours = axios.get(`api/school/lecon/${this.state.titre}`);
        const cours = contentCours.data;
        this.setState({ content: cours.content, new: 1 });
      } catch (err) {
        console.log(err);
      }
    }

    if (this.state.classe !== prevState.classe) {
      try {
        const programme = axios.get(`api/school/`);
        this.setState({ program: programme });
      } catch {
        console.log("Erreur");
      }
    }
  }

  render() {
    return (
      <LayoutT title="Cours">
        {this.state.isLoading ? (
          <Loaders />
        ) : (
          <React.Fragment>
            <div className="panneauStyle">
              <div className="panneauClasse">
                <SiGoogleclassroom size="20px" />{" "}
                <span>{this.state.classe}</span>
              </div>
              <div id="triangle"></div>
              <h3 className="form-group">
                Titre :{" "}
                <select
                  className="form-select"
                  onChange={(e) => this.setState({ lecon: e.target.value })}
                  value={this.lecon.titre}
                >
                  {this.state.program.map((program) => (
                    <option value={program.id}>{program.name}</option>
                  ))}
                </select>
              </h3>
            </div>
            <ModalSelectClasse
              classeTeacher={this.state.user.classes}
              recuperation={this.getInfo}
            />
            <div className="container-fluid">
              <div className="mainCard">
                <section className="row">
                  <div className="col-12 content-card">
                    <form onSubmit={this.handleSubmit}>
                      <Editor
                        apiKey="0p57wtq8ihmq5rdl86lg5w6ph4kamw3z10pscm7wvic034n2"
                        value={this.state.content}
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
                        <button
                          type="submit"
                          className="btn boutonT bntTeacher"
                        >
                          Publier
                        </button>
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
