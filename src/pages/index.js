/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Matvii Merezhko Student ID: 127769230 Date: 2025-03-18
*
********************************************************************************/ 


import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Pagination, Accordion, Container } from 'react-bootstrap';
import ListingDetails from '@/components/ListingDetails';
import PageHeader from '@/components/PageHeader';
const fetcher = async (url) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error(`Request failed with status: ${response.status}`);
    error.info = await response.json().catch(() => ({}));
    error.status = response.status;
    throw error;
  }
  
  return response.json();
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const { data, error } = useSWR(`/api/proxy-listings?page=${page}&perPage=10`, 
    fetcher
  );

  useEffect(() => {
    if (data) {
      setPageData(Array.isArray(data) ? data : data.listings || []);
    }
  }, [data]);
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <br/>
      <PageHeader text="Browse Listings : Sorted by Number of Ratings" />
      {error && (
        <div className="alert alert-danger">
          Error loading listings: {error.status ? `Request failed with status: ${error.status}` : error.message}
        </div>
      )}
      {!pageData.length && !error && <div className="text-center">Loading...</div>}
      <Accordion>
        {pageData.map((listing) => (
          <Accordion.Item eventKey={listing._id} key={listing._id}>
            <Accordion.Header>
              <strong>{listing.name}</strong> - {listing.address?.street}
            </Accordion.Header>
            <Accordion.Body>
              <ListingDetails listing={listing} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      {pageData.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </div>
      )}
    </Container>
  );
}