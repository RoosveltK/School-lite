import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";

const ModalHelp = ({ tabHelp }) => {
  const [show, setShow] = useState(false);
  const [i, setI] = useState(0);
  const [helpMessage, setHelpMessage] = useState([]);

  useEffect(() => {
    setHelpMessage(tabHelp);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nextHelp = () => {
    if (i >= helpMessage.length - 1) {
      setI(0);
      handleClose();
    } else setI(i + 1);
  };

  const previewHelp = () => {
    if (i - 1 < 0 || i == 0) setI(helpMessage.length - 1);
    else setI(i - 1);
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <FiHelpCircle size="20px" /> Aide
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "700" }}>
            AIDE{" "}
            {helpMessage.length != 0 ? (
              <React.Fragment>
                {helpMessage[i].page != "" ? (
                  <React.Fragment>
                    {" "}
                    :{" "}
                    <span className="text-success">{helpMessage[i].page}</span>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "500", fontSize: "16px" }}>
          &nbsp; &nbsp; &nbsp;{" "}
          {helpMessage.length != 0 ? `${helpMessage[i].msg}` : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={previewHelp}>
            Précédent
          </Button>
          <Button variant="secondary" onClick={nextHelp}>
            Suivant
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalHelp;
