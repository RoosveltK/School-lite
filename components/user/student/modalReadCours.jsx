import Link from "next/link";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalReadCours = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  return (
    <>
      <button className="btn" onClick={handleShow}>
        <Link href="/">
          <a>Lire</a>
        </Link>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="color-titre-ajout" closeButton>
          <Modal.Title className="colorTitre">INTRODUCTION AUX TIC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ex proident laborum nulla duis. Veniam esse cillum tempor exercitation
          nulla ipsum id excepteur do cillum consequat consectetur quis.
          Cupidatat est aute Lorem in eu esse dolor id veniam nulla exercitation
          proident. Magna aliqua magna voluptate quis et ipsum et sit do irure
          id non. Sunt eu laborum consectetur commodo exercitation Lorem sunt
          sit Lorem labore duis dolor magna amet. Reprehenderit sunt id in amet
          consectetur veniam laborum nulla Lorem. Elit labore sit fugiat est do
          ipsum mollit ut pariatur laboris et duis commodo sunt. Eu adipisicing
          amet nostrud fugiat tempor magna fugiat excepteur aliqua deserunt id.
          Culpa cillum ut cupidatat sunt nulla esse labore magna in. Anim
          exercitation sit irure ex. Ullamco non sit irure sint consectetur
          cillum sint sunt deserunt cupidatat. Ex adipisicing pariatur cupidatat
          nisi Lorem. Ullamco quis culpa amet et tempor consectetur adipisicing
          ex minim sunt labore dolore. Eu velit laboris commodo tempor
          adipisicing ullamco laborum dolor ipsum occaecat commodo laborum. Non
          culpa dolor aute nulla elit quis ex commodo fugiat Lorem culpa. Ipsum
          irure cillum reprehenderit labore ad. Duis labore est incididunt
          tempor magna labore fugiat laboris aliqua do dolor cillum esse do. Id
          adipisicing sit ea enim do ullamco. Et elit exercitation tempor
          reprehenderit sint qui dolor excepteur laborum est consequat. Id enim
          excepteur non exercitation qui pariatur nostrud aliqua. Tempor ut sint
          eiusmod eu eiusmod nostrud tempor deserunt esse. Mollit eu cupidatat
          sit proident mollit laboris incididunt. Occaecat ullamco deserunt quis
          ad aliqua pariatur consequat sint sit tempor deserunt. Esse ex laborum
          anim in culpa non excepteur enim est. Incididunt cupidatat aliqua
          laborum sit mollit. Consectetur elit occaecat ipsum consectetur id
          dolor eiusmod mollit consectetur anim esse commodo tempor. Veniam
          ullamco officia elit ea. Est quis ut amet est. Labore non dolor anim
          tempor ipsum ut duis. Aliquip minim deserunt enim in id aute dolore
          commodo. Incididunt incididunt esse voluptate deserunt. Quis
          reprehenderit est sit velit consectetur officia laborum nulla ullamco
          cillum culpa. Do qui deserunt labore eu est ullamco velit consequat
          eiusmod incididunt cupidatat. Id mollit laboris nisi commodo. Deserunt
          incididunt ex ut ex magna dolor dolor Lorem. Veniam Lorem et officia
          ad ipsum magna deserunt commodo adipisicing fugiat ipsum sunt aute
          laboris. Culpa tempor fugiat dolore non nostrud pariatur eu eu officia
          quis. Ea sint aute eu velit officia excepteur anim adipisicing.
          Voluptate est nostrud est aliqua officia elit quis dolor. Dolor qui
          nostrud irure sit. Dolore aute consequat elit esse eu. Ipsum pariatur
          sint ad tempor labore nulla pariatur nulla culpa duis et ex
          reprehenderit. Eiusmod nisi irure ipsum ullamco esse nostrud qui
          exercitation qui officia ipsum amet ullamco. Enim fugiat magna
          proident commodo tempor. Esse mollit nulla ipsum ex dolor. Fugiat eu
          magna pariatur exercitation qui occaecat non sunt nisi ipsum ipsum
          cupidatat. Fugiat nulla id sunt consequat. Sunt Lorem consectetur nisi
          consequat sunt qui. Sit consequat pariatur officia incididunt commodo
          proident id occaecat duis esse excepteur excepteur dolor minim. Cillum
          pariatur est qui laboris minim. Do mollit ad ex quis id mollit
          consectetur adipisicing eiusmod commodo ea. Sint qui dolor fugiat
          reprehenderit consectetur id ea irure Lorem pariatur cillum amet
          dolor. Et aliquip sit eu laborum mollit.
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn bntTeacher">
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalReadCours;
