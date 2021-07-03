import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const departement = [
  { value: "math", name: "Mathématique" },
  { value: "phy", name: "Physique" },
  { value: "chim", name: "Chimie" },
  { value: "hist", name: "Histoire" },
  { value: "svt", name: "Science" },
  { value: "ecm", name: "ECM" },
  { value: "eps", name: "Sport" },
  { value: "eng", name: "Anglais" },
];

const classeDispo = [
  { value: "0", name: "Terminale" },
  { value: "1", name: "Première" },
  { value: "2", name: "Seconde" },
  { value: "3", name: "Troisième" },
  { value: "4", name: "Quatrième" },
  { value: "5", name: "Cinquième" },
  { value: "6", name: "Sixième" },
];
export default function ModalSelect({ recuperation, matiereNiveau, classes }) {
  const [show, setShow] = useState(true);
  const [matiere, setMatiere] = useState(null);
  const [tabContent, setTabContent] = useState([]);

  const handleClose = () => setShow(false);

  useEffect(() => {
    let tab = [];
    let info;
    classes.map((element) => {
      matiereNiveau.map((elt) => {
        if (element.id == elt.classe) {
          info = {
            id: elt.id,
            nameMatter: elt.matter,
            classeLevel: element.level,
            classeSpeciality: element.speciality,
          };
          tab.push(info);
        }
      });
    });

    try {
      tab.forEach((val) => {
        let level = classeDispo.find(
          (classe) => classe.value == val.classeLevel
        );
        val.classeLevel = level.name;
        let matter = departement.find((elt) => elt.value == val.nameMatter);
        val.nameMatter = matter.name;
      });
      setTabContent(
        tab.sort((a, b) => a.nameMatter.localeCompare(b.nameMatter))
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (matiere == null || matiere == undefined) {
      toast.error("Veuillez séléctionner une matière et une classe");
    } else {
      recuperation(matiere);
      setShow(false);
    }
  };
  const handleChange = (val) => {
    const mat = tabContent.find((classe) => classe.id == val);
    setMatiere(mat);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modalSuppression"
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="color-titre-ajout">
          <Modal.Title>Sélection Matière</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <select
                className="form-select"
                onChange={(e) => handleChange(e.target.value)}
                id="matiere"
              >
                <option value="">Veuillez séléctionner la matière</option>
                {tabContent.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.nameMatter} : {mat.classeLevel}-{mat.classeSpeciality}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <Modal.Footer>
            <Button className="btn color-titre-ajout" onClick={handleSubmit}>
              Soumettre
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
