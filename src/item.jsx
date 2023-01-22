import React, { useState } from 'react';
import { Col, Image, Card, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

export default function Item(props) {
  const [colors, setColors] = useState(false);
  return (
    <Col sm={12} md={4} key={props.item.index} className="pb-2">
      <div className='w-100 menu-item-container'>
        <Card className='badge-hover menu-card' onClick={props.increment} style={{ backgroundColor: colors[0] }}>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-start'>
              <ColorExtractor
                onError={error => console.log(error)}
                getColors={colors => { setColors(colors); console.log(colors) }}
                maxColors={1}
              ><img src={props.item.picture}></img></ColorExtractor>
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
                <p className='m-0 fw-bold'>{props.item.name}</p>
                <p className='m-0 text-muted'><small>{props.item.description}</small></p>
                <p className='m-0'><small>€{props.item.price.toFixed(2)}</small></p>
              </div>
            </div>
            <div className='mx-3 my-2'>
              {props.item.amount > 0 ?
                <Badge pill bg="primary">{props.item.amount}</Badge> :
                <FaPlus style={{ filter: "opacity(20%)" }} />
              }
            </div>
          </div>
        </Card>
      </div>
    </Col>
  );
}