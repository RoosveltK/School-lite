import React, { useState } from "react";
import Link from "next/link";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Router from "next/router";

export default function ModalSelect({ recuperation }) {
  const [show, setShow] = useState(true);
  const [matiere, setMatiere] = useState("");
  const [niveau, setNiveau] = useState("");
  const [specialite, setSpecialite] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(matiere, niveau, specialite);
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
                onChange={(e) => setMatiere(e.target.value)}
                id="matiere"
              >
                <option>Informatique</option>
                <option>Anglais</option>
                <option>Mathématique</option>
                <option>SVT</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="niveau">Niveau</label>
              <select
                className="form-select"
                onChange={(e) => setNiveau(e.target.value)}
                id="niveau"
              >
                <option>6e </option>
                <option>5e</option>
                <option>4e</option>
                <option>3e</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialite">Spécialité</label>
              <select
                className="form-select"
                onChange={(e) => setSpecialite(e.target.value)}
                id="specialite"
              >
                <option>Espagnol</option>
                <option>Chinois</option>
                <option>Allemand</option>
                <option>Latin</option>
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
