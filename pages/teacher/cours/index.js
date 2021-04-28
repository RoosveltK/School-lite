import React from "react";
import LayoutT from "../../../components/LayoutT";
import { SiGoogleclassroom } from "react-icons/si";
import { Editor } from "@tinymce/tinymce-react";

class Cours extends React.Component {
  state = {
    content: "",
    titre: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      cours: this.state.cours,
      titre: this.state.titre,
    };
    console.log(data);
  };

  handleChange = (content, editor) => {
    this.setState({ content });
  };

  render() {
    return (
      <LayoutT title="Cours">
        <div className="panneauStyle">
          <div className="panneauClasse">
            <SiGoogleclassroom size="20px" /> Classe
          </div>
          <div id="triangle"></div>
          <h3>
            Titre :{" "}
            <input
              type="text"
              value={this.state.titre}
              onChange={(e) => this.setState({ titre: e.target.value })}
              required
            />
          </h3>
        </div>
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
                  />
                  <br />
                  <div className="col-12 header-card">
                    <span></span>
                    <button type="submit" className="btn boutonT">
                      Publier
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </LayoutT>
    );
  }
}
export default Cours;
