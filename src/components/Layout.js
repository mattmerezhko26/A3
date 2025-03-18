import MainNav from './MainNav'; 
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
    <br/>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
};

export default Layout;
