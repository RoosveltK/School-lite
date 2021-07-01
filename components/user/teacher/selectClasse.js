import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ModalSelectClasse({ recuperation }) {
  const [show, setShow] = useState(true);
  const [classe, setClasse] = useState("");

  const getClassInLocalStorage = () =>
    JSON.parse(localStorage.getItem("teacherInfo"));

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(classe);
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modalSuppression"
        backdrop="static"
        keyboard={false}
      >
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
                <option>Veuillez séléctionner la classe</option>
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
            <Button className="btn color-titre-ajout" onClick={handleSubmit}>
              Soumettre
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
