import { Container, Nav, Navbar } from 'react-bootstrap'

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
  const { currentUser, logOut } = useAuth()
  const confirmLogout = () => {
    const choice = window.confirm('Are you sure to leave?')
    if (choice) {
      logOut()
    }
  }

  return (
    <>
      <Nav.Link>
        Hi {currentUser.firstName} {currentUser.lastName}!
      </Nav.Link>
      <Nav.Link href={routes.userdashboard()} className={'active'}>
        Dashboard
      </Nav.Link>
      <Nav.Link onClick={confirmLogout} className={'active'}>
        Logout
      </Nav.Link>
    </>
  )
}

const AdminView = () => {
  const { currentUser, logOut } = useAuth()
  const confirmLogout = () => {
    const choice = window.confirm('Are you sure to leave?')
    if (choice) {
      logOut()
    }
  }

  return (
    <>
      <Nav.Link>
        Hi {currentUser.firstName} {currentUser.lastName}!
      </Nav.Link>
      <Nav.Link href={routes.userdashboard()} className={'active'}>
        Dashboard
      </Nav.Link>
      <Nav.Link onClick={confirmLogout} className={'active'}>
        Logout
      </Nav.Link>
    </>
  )
}

export default NavMenu
