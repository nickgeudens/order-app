import React from 'react';
import { Container,  Image } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container 
      className='d-flex flex-column justify-content-center align-items-center bg-dark'>
      <Image src='assets/dorst.png' className='w-50 my-5'/>
    </Container>
  );
}