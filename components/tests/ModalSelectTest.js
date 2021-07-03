import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalSelectTest({ recuperation }) {
  const [show, setShow] = useState(true);
  const [matiere, setMatiere] = useState("");
  const [niveau, setNiveau] = useState("");
  const [specialite, setSpecialite] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(matiere, niveau, specialite);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modalSuppression">
        <Modal.Header className="color-titre-ajout">
          <Modal.Title>Selection Niveau</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="matiere">Matière</label>
              <select
                className="form-select"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                id="matiere"
              >
                <option value={`Informatique`}>Informatique</option>
                <option value={`Anglais`}>Anglais</option>
                <option value={`Mathématique`}>Mathématique</option>
                <option value={`SVT`}>SVT</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="niveau">Niveau</label>
              <select
                value={niveau}
                className="form-select"
                onChange={(e) => setNiveau(e.target.value)}
                id="niveau"
              >
                <option value={`6e`}>6e </option>
                <option value={`5e`}>5e</option>
                <option value={`4e`}>4e</option>
                <option value={`3e`}>3e</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialite">Spécialité</label>
              <select
                className="form-select"
                onChange={(e) => setSpecialite(e.target.value)}
                id="specialite"
                value={specialite}
              >
                <option value={`Espagnol`}>Espagnol</option>
                <option value={`Chinois`}>Chinois</option>
                <option value={`Allemand`}>Allemand</option>
                <option value={`Latin`}> Latin</option>
              </select>
            </div>
          </form>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button className="btn color-titre-ajout" onClick={handleSubmit}>
              Soumettre
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
