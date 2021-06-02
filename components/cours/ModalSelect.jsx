import React, { useState } from "react";
import Link from "next/link";
import { Modal, Button, Dropdown } from "react-bootstrap";
import Router from "next/router";

export default function ModalSelect({ recuperation, matiereNiveau }) {
  const [show, setShow] = useState(true);
  const [matiere, setMatiere] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(matiere);
    setShow(false);
  };
  const handleChange = (index) => {
    console.log(`Voila xa ${index}`);
    const datas = matiereNiveau[index];
    setMatiere(datas);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modalSuppression">
        <Modal.Header className="color-titre-ajout">
          <Modal.Title>Selection Niveau et Matière</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="matiere">Matière</label>
              <select
                className="form-select"
                onChange={(e) => handleChange(e.target.value)}
                id="matiere"
              >
                {matiereNiveau.map((mat, index) => (
                  <option value={parseInt(index)}>
                    {mat.classe.level.describe} - {mat.classe.speciality.letter}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <Modal.Footer>
            {/* <Button className="btn btn-secondary" onClick={handleClose}>
              Fermer
            </Button> */}
            <Button className="btn color-titre-ajout" onClick={handleSubmit}>
              Soumettre
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
