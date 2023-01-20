import React from 'react';
import { Container,  Image } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container fluid
      className='d-flex justify-content-center align-items-start bg-dark min-vh-100'>
      <Image src='assets/dorst.png'  className='my-5 pt-5' style={{
        filter: "grayscale(100%) brightness(50%)", maxWidth: "50%"
        }}/>
    </Container>
  );
}