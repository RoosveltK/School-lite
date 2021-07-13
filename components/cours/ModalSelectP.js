import React, { useState } from "react";
import Link from "next/link";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

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
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modalSuppression"
      >
        <Modal.Header className="color-titre-ajout" closeButton>
          <Modal.Title>Selection Niveau et Matière</Modal.Title>
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
                {matiereNiveau.map((mat) => (
                  <option value={mat.id}>{mat.classe}</option>
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
