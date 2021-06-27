import React, { useState } from "react";
import Link from "next/link";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ModalSelectClasse({ recuperation, classeTeacher }) {
  const [show, setShow] = useState(true);
  const [classe, setClasse] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(classe);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modalSuppression">
        <Modal.Header className="color-titre-ajout">
          <Modal.Title>Selection de la Classe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="niveau">Classe</label>
              <select
                value={classe}
                className="form-select"
                onChange={(e) => setClasse(e.target.value)}
                id="niveau"
              >
                <option value={`6e`}>6e </option>
                <option value={`5e`}>5e</option>
                <option value={`4e`}>4e</option>
                <option value={`3e`}>3e</option>
                {/* {classeTeacher.map((classe, index) => (
                  <option key={index} value={classe}>{classe.name}</option>
                ))} */}
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
