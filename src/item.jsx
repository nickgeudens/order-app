import React from 'react';
import { Col, Image, Card, Badge, Button } from 'react-bootstrap';
import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa';

export default function Item(props) {

  return (
    <Col sm={12} md={4} key={props.item.index} className="pb-2">
      <Card className={props.item.amount > 0 ? "in-basket" : ""} >
        <div className='d-flex'>
          <div
            style={{ backgroundColor: "var(--bs-card-bg)", borderRadius: "var(--bs-card-border-radius)"}}
            className={
              "badge-hover d-flex justify-content-between w-100 " + (props.item.unavailable ? "unavailable " : "")
            }
            onClick={props.item.unavailable?"":props.increment}
          >
            <div className='d-flex align-items-center'>
              <Image className={"m-3"}
                style={{
                  maxWidth: "3em",
                  maxHeight: "3em",
                  width: "auto",
                  height: "auto"
                }}
                fluid
                rounded
                src={props.item.picture}
              />

              <div className='d-flex flex-column m-2 mr-auto'>
                <p className='m-0 fw-bold'>{props.item.name}</p> 
                <p className='m-0 text-muted'><small>{props.item.description}</small></p>
                <p className='m-0'><small>€{props.item.price.toFixed(2)}</small></p>
              </div>
            </div>
            <div className='d-flex mx-3 my-2 align-items-center'>
              {props.item.amount > 0 ?
                <Badge pill bg="dark" ><big>{props.item.amount}</big></Badge> :
                props.item.unavailable?<Badge bg="danger" pill >uitverkocht</Badge>:<FaPlus style={{ filter: "opacity(20%)" }} />
              }

            </div>
          </div>
          <Button hidden={!props.item.amount > 0}
            variant="danger" 
            className='px-3 reset-button-gone'
            style={{borderRadius: "0px var(--bs-card-border-radius) var(--bs-card-border-radius) 0px"}}
            onClick={props.decrement}
          ><FaMinus /></Button>
        </div>

      </Card>

      {/* <Modal
      show={show}
      centered
      //fullscreen
      onHide={()=>setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body >
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-around w-100'>
        <ButtonGroup>
          <Button
            onClick={props.decrement}
            disabled={props.item.amount===0}
          ><FaMinus /></Button>
          <Button
            variant="info"
            onClick={props.increment}
          ><FaPlus /></Button>
        </ButtonGroup>
        </div>
       
      </Modal.Footer>
    </Modal> */}
    </Col>
  );
}