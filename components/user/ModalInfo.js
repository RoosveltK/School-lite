import React from "react";
import { Modal } from "react-bootstrap";

const ModalInfo = ({ info, show, changeValue }) => {
  const handleClose = () => changeValue(false);

  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {info != null ? info.matiere : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "500", fontSize: "16px" }}>
          <ul>
            {info != null ? (
              <React.Fragment>
                {info.tests.map((mat, index) => {
                  return (
                    <li>
                      {mat.programTitle} : <strong>{mat.note}/20</strong>
                    </li>
                  );
                })}
              </React.Fragment>
            ) : null}
          </ul>
          <div>
            Pourcentage de réussite :{" "}
            {info != null ? (
              <React.Fragment>
                {info.pourcentage >= 50 ? (
                  <span className="text-success">{info.pourcentage} %</span>
                ) : (
                  <span className="text-danger">{info.pourcentage} %</span>
                )}
              </React.Fragment>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalInfo;
