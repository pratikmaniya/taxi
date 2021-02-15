import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
    return (
        <div>
            <Modal size={props.size} isOpen={props.isModalOpen} toggle={() => props.toggle(false)} className={props.className}>
                <ModalHeader toggle={() => props.toggle(false)}>{props.modalTitle}</ModalHeader>
                <ModalBody>
                    {props.modalBody}
                    {props.modalBodyFooter}
                </ModalBody>
                <ModalFooter>{props.modalFooter}</ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;