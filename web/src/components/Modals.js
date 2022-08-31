import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button } from 'react-bootstrap'

const Modals = (props) => {
  const { text, comp, icon } = props

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {icon ? <FontAwesomeIcon icon={icon} /> : <></>}
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{comp}</Modal.Body>
      </Modal>
    </>
  )
}

export default Modals
