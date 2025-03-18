import { Card } from 'react-bootstrap';

const PageHeader = ({ text }) => {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <p>{text}</p>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default PageHeader;