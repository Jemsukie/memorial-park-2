import { Container, Nav, Navbar } from 'react-bootstrap'

import { routes } from '@redwoodjs/router'

// The purpose of `items` data is to group navigation links
const items = [['home', 'about', 'contact', 'login']]

const linkItems = [
  {
    name: 'home',
    html: 'Home',
  },
  {
    name: 'about',
    html: 'About',
  },
  {
    name: 'contact',
    html: 'Contact Us',
  },

  {
    name: 'login',
    html: 'Login',
  },
]

// Let's use tab links using their respective URLs
const getItemLinks = (index) => {
  return items[index].map((item) => {
    return linkItems.find((ll) => {
      return ll.name === item
    })
  })
}

const getIndex = (name) => {
  let index = 0

  for (let i = 0; i < items.length; i++) {
    const found = items[i].find((it) => {
      return it === name
    })
    if (found) {
      index = i
      break
    }
  }
  return index
}

const NavMenuLinks = (props) => {
  // This function will return a line of navigation link into the navbar
  const { name } = props
  const index = getIndex(name)

  return getItemLinks(index).map((gi, i) => {
    return (
      <Nav.Link
        key={i}
        href={routes[gi.name]()}
        className={gi.name === name ? 'active' : ''}
      >
        {gi.html}
      </Nav.Link>
    )
  })
}

const Navigate = (props) => {
  console.log(props.item.props.name)
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href={routes.home()}>Memo Park</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavMenuLinks name={props.item.props.name} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigate
