import { useState } from 'react'

import { Container, Nav, Navbar } from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

const NavMenu = ({ props }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href={routes.home()}>Memo Park</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <CheckNav {...props} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const CheckNav = (props) => {
  const { link } = props
  if (link === 'viewer') {
    return <Viewer />
  } else if (link === 'user') {
    return <UserView />
  } else if (link === 'admin') {
    return <AdminView />
  }
}

const Viewer = () => {
  return (
    <>
      <Nav.Link href={routes.home()} className={'active'}>
        Home
      </Nav.Link>
      <Nav.Link href={routes.about()} className={'active'}>
        About
      </Nav.Link>
      <Nav.Link href={routes.contact()} className={'active'}>
        Contact Us
      </Nav.Link>
      <Nav.Link href={routes.login()} className={'active'}>
        Login
      </Nav.Link>
    </>
  )
}

const UserView = () => {
  const { currentUser } = useAuth()
  const [view, setView] = useState(false)
  const viewing = (flip) => {
    setView(flip)
  }

  return (
    <>
      <Nav.Link>
        Hi {currentUser.firstName} {currentUser.lastName}!
      </Nav.Link>
      <Nav.Link href={routes.userdashboard()} className={'active'}>
        Dashboard
      </Nav.Link>
      <Nav.Link href={routes.userSettings()} className={'active'}>
        Settings
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          viewing(true)
        }}
        className={'active'}
      >
        Logout
      </Nav.Link>

      {view ? <LogoutModal viewing={viewing} view={view} /> : <></>}
    </>
  )
}

const AdminView = () => {
  const { currentUser } = useAuth()
  const [view, setView] = useState(false)
  const viewing = (flip) => {
    setView(flip)
  }

  return (
    <>
      <Nav.Link>
        Hi {currentUser.firstName} {currentUser.lastName}!
      </Nav.Link>
      <Nav.Link href={routes.admindashboard()} className={'active'}>
        Dashboard
      </Nav.Link>
      <Nav.Link href={routes.adminSettings()} className={'active'}>
        Settings
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          viewing(true)
        }}
        className={'active'}
      >
        Logout
      </Nav.Link>

      {view ? <LogoutModal viewing={viewing} view={view} /> : <></>}
    </>
  )
}

const LogoutModal = (props) => {
  const { logOut } = useAuth()
  const { viewing, view } = props

  const handleClose = () => viewing(false)
  // const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={view} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={logOut}>Confirm</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavMenu
