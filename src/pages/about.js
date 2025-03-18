import { Container, Card, Row, Col } from 'react-bootstrap';

export default function About({ listing }) {
  if (!listing) {
    return <div>Error: Listing not found.</div>;
  }
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (typeof price === 'object' && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);
    }
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return price;
  };
  const getPlaceholderImage = () => {
    const roomType = listing.room_type?.toLowerCase() || '';

    if (roomType.includes('entire')) {
      return 'https://placehold.co/600x400?text=Entire+Home';
    } else if (roomType.includes('private')) {
      return 'https://placehold.co/600x400?text=Private+Room';
    } else if (roomType.includes('shared')) {
      return 'https://placehold.co/600x400?text=Shared+Room';
    } else {
      return 'https://placehold.co/600x400?text=Accommodation';
    }
  };

  return (
    <Container>
      <br />
      <h1>About the Developer</h1>
      <Card className='bg-light'>
        <Card.Body>
          <h2>Matvii Merezhko</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At modi perspiciatis recusandae neque aliquam
            laboriosam provident unde minus eligendi, fugiat sit deserunt totam accusamus debitis, minima optio
            necessitatibus dolorem cumque?
          </p>
          <p>
            Tempore nesciunt porro, beatae soluta rem, sint cupiditate sit omnis reprehenderit corporis totam illo.
            Ipsam aspernatur eligendi recusandae sit voluptates at, nostrum, ducimus maiores esse ipsa odio quos labore
            blanditiis?
          </p>
          <p>
            A distinctio alias impedit nobis natus fugiat. Animi perspiciatis nobis inventore nisi atque quis
            praesentium voluptatum amet eaque sed, modi aspernatur quas iste. Aperiam, facere itaque consectetur
            voluptatibus voluptatum nostrum.
          </p>
          <p>
            Eaque id beatae, quaerat dignissimos, quod modi delectus assumenda nulla eum perferendis magni? Vel nemo
            consectetur qui deleniti placeat necessitatibus fugit vitae! Inventore, nam sed dolore dolorem animi neque
            similique?
          </p>
          <p>
            Dolorum vitae ipsa minus laboriosam omnis cum esse pariatur aspernatur? Accusantium quae officiis voluptate
            cumque, praesentium qui nobis facere fuga recusandae repellendus ipsam dolor ea unde doloribus, odit illum
            atque?
          </p>
          <p>
            Modi animi voluptas similique alias voluptatem ipsam impedit voluptatum dignissimos, officia doloremque,
            dolor quos magnam soluta unde, fuga cumque assumenda possimus est blanditiis fugiat ullam quasi cum qui.
            Dolor, dolorem!
          </p>
        </Card.Body>
      </Card>
      <Card className='my-4'>
        <Card.Body>
          <Row>
            <Col lg={6}>
              <img
                className='img-fluid w-100'
                src={listing.images?.picture_url || getPlaceholderImage()}
                alt={`${listing.room_type || ''} accommodation`}
              />
            </Col>
            <Col lg={6}>
              <h3>{listing.name || 'Listing Details'}</h3>
              <p>
                {listing.neighborhood_overview ||
                  listing.summary ||
                  listing.description ||
                  'No detailed information available.'}
              </p>
              <br />
              {listing.price && (
                <>
                  <strong>Price:</strong> ${formatPrice(listing.price)}
                  <br />
                </>
              )}
              <strong>Room Type:</strong> {listing.room_type || 'N/A'}
              <br />
              <strong>Bed Type:</strong> {listing.bed_type || 'N/A'}
              <br />
              <strong>Accommodates:</strong> {listing.accommodates || 'N/A'} guests
              <br />
              <strong>Bedrooms:</strong> {listing.bedrooms || 'N/A'}
              <br />
              <strong>Beds:</strong> {listing.beds || 'N/A'}
              <br />
              <strong>Minimum Nights:</strong> {listing.minimum_nights || 'N/A'}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    // Using your specific API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://a1-lemon.vercel.app';
    const listingId = '10030955';

    const response = await fetch(`${API_URL}/api/listings/${listingId}`);
    if (!response.ok) {
      console.error(`Failed to fetch listing: ${response.status} ${response.statusText}`);
      return {
        props: {
          listing: null, 
        },
      };
    }

    const data = await response.json();
    return {
      props: {
        listing: data,
      },
      revalidate: 60, 
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        listing: null,
      },
    };
  }
}
