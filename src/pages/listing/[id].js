import { useRouter } from 'next/router';
import useSWR from 'swr';
import ListingDetails from '@/components/ListingDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';
import { Container } from 'react-bootstrap';

const fetcher = async (url) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error(`Request failed with status: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  
  return response.json();
};

export default function Listing() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(
    id ? `https://a1-lemon.vercel.app/api/listings/${id}` : null,
    fetcher
  );
  if (isLoading) {
    return null;
  }
  if (error || !data) {
    return <Error statusCode={404} />;
  }
  
  return (
    <Container>
      <PageHeader text={data.name} />
      <ListingDetails listing={data} />
    </Container>
  );
}