import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Router from "next/router";

export default function ModalDelete(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (survid) => {
    if (props.titre == "enseignant") {
      axios
        .delete(`users/users/${survid}`)
        .then(() => {
          toast.success("Enseignant supprimmé ");
          setTimeout(() => Router.reload(), 2000);
        })
        .catch(() => toast.error("Erreur lors de la suppression"));
    }
    if (props.titre == "eleve") {
      axios
        .delete(`surveillance/supervisor/${survid}`)
        .then(() => {
          toast.success("Elève supprimmé ");
          setTimeout(() => Router.reload(), 2000);
        })
        .catch(() => toast.error("Erreur lors de la suppression "));
    }
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Supprimer</Dropdown.Item>
      <Modal show={show} onHide={handleClose} className="modalSuppression">
        <Modal.Header closeButton className="color-titre-ajout">
          <Modal.Title className="colorTitre">SUPPRESSION</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes vous certains de vouloir le supprimer ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No/Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(props.id);
              setShow(false);
            }}
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
