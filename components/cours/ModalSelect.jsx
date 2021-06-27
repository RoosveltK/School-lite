import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
export default function ModalSelect({ recuperation, matiereNiveau }) {
  const [show, setShow] = useState(true);
  const [matiere, setMatiere] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    recuperation(matiere);
    if (matiere == "") toast.error("Veuillez séléctionner une matière");
    else setShow(false);
  };
  const handleChange = (index) => {
    const datas = matiereNiveau[index];
    setMatiere(datas);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modalSuppression"
        keyboard={false}
      >
        <Modal.Header className="color-titre-ajout">
          <Modal.Title>Sélection Matière</Modal.Title>
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
                  <option key={index} value={parseInt(index)}>
                    {mat.classe.level.describe} - {mat.classe.speciality.letter}
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
