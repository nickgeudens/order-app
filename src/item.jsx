import React from 'react';
import { Container, Col, Image, Card, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Item(props) {
  return (
    <Col sm={12} key={props.item.index} className="pb-2">
      <div className='w-100 menu-item-container'>
        <Card className='badge-hover menu-card' onClick={props.increment}>
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
                <p className='m-0 fw-bold'>{props.item.name} <Badge pill bg="primary">{props.item.amount > 0 ? props.item.amount : ""}</Badge></p>
                <p className='m-0 text-muted'><small>{props.item.description}</small></p>
                <p className='m-0'><small>€{props.item.price.toFixed(2)}</small></p>
              </div>
            </div>


            <div className="d-flex justify-content-end align-items-start" style={{ filter: "opacity(50%)" }}>
              <FaPlus className='m-3'  />
            </div>


          </div>
        </Card>
        {props.item.amount > 0 ? <Card className='badge-hover justify-content-center  h-50 px-3 m-0 minus text-light'
          bg='danger'
          style={{
            borderRadius: "var(--bs-card-border-radius) 0px",
            borderWidth: "0px"
          }}
          onClick={props.decrement}
        >
          <FaMinus/>
        </Card> : ""}
      </div>
    </Col>
  );
}