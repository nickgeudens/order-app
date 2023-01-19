import React from 'react';
import { Container,  Image } from 'react-bootstrap';

export default function EmptyPage() {
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center my-5'>
      <h2 className='text-muted'>Geen resultaten</h2>
      <Image src='assets/dorst.png' className='w-50'/>
    </Container>
  );
}