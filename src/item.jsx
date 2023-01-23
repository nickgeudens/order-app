import React from 'react';
import { Col, Image, Card, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
//import { FastAverageColor } from 'fast-average-color';

export default function Item(props) {
  // const [color, setColor] = useState("");
  // new FastAverageColor().getColorAsync(props.item.picture)
  //   .then(color => setColor(color.rgba.slice(0, -2)+"0.2)"))
  //   .catch(e => {
  //       console.log(e);
  //   });

  return (
    <Col sm={12} md={4} key={props.item.index} className="pb-2">
        <Card 
          className={
            "badge-hover " + (props.item.amount > 0 ? "in-basket ":"") + (props.item.unavailable? "unavailable ":"")
          } 
          onClick={props.increment}>
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
                <p className='m-0 fw-bold'>{props.item.name}</p>
                <p className='m-0 text-muted'><small>{props.item.description}</small></p>
                <p className='m-0'><small>€{props.item.price.toFixed(2)}</small></p>
              </div>
            </div>
            <div className='mx-3 my-2'>
              {props.item.amount > 0 ?
                <Badge pill bg="dark">{props.item.amount}</Badge> :
                <FaPlus style={{ filter: "opacity(20%)" }} />
              }
            </div>
          </div>
        </Card>
    </Col>
  );
}