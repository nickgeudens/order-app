import React from 'react';
import { Container, ButtonGroup, Button, Image, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Item(props) {
    return (
      <Container key={props.item.index} className={"pb-2"}>
        <Card>
        <Row>
          <Col xs={7}>
              <Image className={"mx-2"}
              style={{
                maxWidth: "4em",
                maxHeight: "4em",
                width: "auto",
                height: "auto"
              }}
              fluid
                thumbnail
                src={props.item.picture}
              />
              {props.item.name}
              €{props.item.price}
          </Col>
            
          <Col xs={5} className={"d-flex justify-content-end"}>
              
              <ButtonGroup className="me-2" aria-label="First group" size="sm">
                <Button variant="info" onClick={props.decrement}><strong><FaMinus/></strong></Button>
                <Button variant="secondary">{props.item.amount}</Button>
                <Button variant="info" onClick={props.increment}><strong><FaPlus/></strong></Button>
              </ButtonGroup>
          </Col>
        </Row>
        </Card>
        
      </Container>
    );
  }