import React from 'react';
import { Container, ButtonGroup, Button, Image, Card, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Item(props) {
  return (
    <Container key={props.item.index} className={"pb-2"}>
      <Card>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-start'>
            <Image className={"m-2"}
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
            <div className='d-flex flex-column m-2 mr-auto'>
              <p className='m-0 fw-bold'>{props.item.name} <Badge pill bg="primary">{props.item.amount > 0 ? props.item.amount :""}</Badge></p> 
              <p className='m-0 text-muted'><small>{props.item.description}</small></p>
              <p className='m-0'><small>€{props.item.price.toFixed(2)}</small></p>
            </div>
          </div>

          <div className='p-2 justify-content-end align-items-start'>
            {/* <ButtonGroup className="me-2" aria-label="First group" size="sm">
              <Button variant="info" onClick={props.decrement}><strong><FaMinus /></strong></Button>
              <Button variant="secondary">{props.item.amount}</Button>
              <Button variant="info" onClick={props.increment}><strong><FaPlus /></strong></Button>
            </ButtonGroup> */}
            <div className='d-flex flex-row'>
              <Badge pill bg="light"
                className="p-2 badge-hover mx-2"
                onClick={props.decrement}
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              >{props.item.amount > 0?<FaMinus/>:""}</Badge>
            <Badge pill bg="light"
                className="p-2 badge-hover mx-2"
                onClick={props.increment}
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              >{<FaPlus/>}</Badge>
            </div>
            
          </div>
        </div>
      </Card>
    </Container>
  );
}