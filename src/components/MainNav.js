import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const MainNav = () => {
  return (
    <Navbar bg="dark" variant="dark" className="fixed-top">
      <Container>
        <Navbar.Brand>Matvii Merezhko</Navbar.Brand>

        <Nav className="ms-auto">
          <Link href="/" passHref legacyBehavior>
            <Nav.Link>Listings</Nav.Link>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <Nav.Link>About</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNav;