import React from "react";
import { Modal, Button } from "react-bootstrap";

/* 
   Create a basic modal with the info we need, that info is recive into the props.children
*/

const NewModal = (props) => {
   return (
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{props.children}</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
               Save Changes
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default NewModal;
