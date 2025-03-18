import { Container, Row, Col } from 'react-bootstrap';

const ListingDetails = ({ listing }) => {
  const { neighborhood_overview, price, room_type, bed_type, beds, review_scores, number_of_reviews, picture_url } =
    listing;
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : 'N/A';

  return (
    <Container>
      <Row>
        <Col lg>
          <img
            className='img-fluid w-100'
            src={listing.images?.picture_url}
            alt={`${listing.room_type || ''} accommodation`}
          />
          <br />
          <br />
        </Col>
        <Col lg>
          <p>{neighborhood_overview || 'No neighborhood overview available.'}</p>
          <br />
          <strong>Price:</strong> ${formattedPrice}
          <br />
          <strong>Room:</strong> {room_type}
          <br />
          <strong>Bed:</strong> {bed_type} ({beds})
          <br />
          <br />
          <strong>Rating:</strong> {review_scores?.review_scores_rating || 'N/A'} / 100 ({number_of_reviews} Reviews)
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetails;
