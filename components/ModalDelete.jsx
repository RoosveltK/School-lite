import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Router from "next/router";
import axios from "axios";

export default function ModalDelete(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (survid) => {
    if (props.titre == "enseignant") {
      axios
        .delete(`api/user/${survid}`)
        .then(() => {
          toast.success("Enseignant supprimmé");
          setTimeout(() => Router.reload(), 2000);
        })
        .catch(() => toast.error("Erreur lors de la suppression"));
    }
    if (props.titre == "eleve") {
      axios
        .delete(`api/user/${survid}`)
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
        <Modal.Body>
          Etes vous certains de vouloir le supprimer ?
          <Button variant="primary" onClick={handleClose}>
            NON
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(props.id);
              setShow(false);
            }}
          >
            OUI
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
