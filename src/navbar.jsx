import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navbar, Badge, Container, Form } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { Link } from "react-scroll";
import 'swiper/css';

export default function CategoryNavbar(props) {
  const [selected, setSelected] = useState(props.categories[0]);
  const [swiper, setSwiper] = useState(null);
  const [searching, setSearching] = useState(false);

  const changeSelected = (category) => {
    setSelected(category)
    if (swiper) {
      swiper.slideTo(props.categories.indexOf(category))
    }
  }

  const toggleFilter = () => {
    if (searching) {
      props.setFilter("")
    }
    setSearching(!searching)

  }

  return (
      <Navbar bg="light" variant="light" sticky="top" className='py-0' style={{ height: "4em" }}>
        <Container>
          {searching ?
            <Form.Control
              autoFocus
              style={{ borderRadius: "var(--bs-border-radius-pill)" }}
              placeholder="Zoeken"
              className="w-100 mx-1 me-2 p-1 my-2"
              onChange={event => props.setFilter(event.target.value)}
              onPointerCancel={toggleFilter}
            /> : <></>}
          <Swiper className={searching ? "d-none" : ""}
            slidesPerView="auto"
            direction="horizontal"
            onSwiper={setSwiper}
            preventClicks={false}
          >
            <ul>
              {props.categories.map((category) => (
                <SwiperSlide style={{ width: "unset" }} key={category}>
                  <li className="m-2" key={category}>
                    <Link key={category.toLowerCase()}
                      spy
                      hashSpy
                      duration={1}
                      to={category.toLowerCase()}
                      offset={-54}
                      spyThrottle={500}
                      onSetActive={() => changeSelected(category)}
                    >
                      <Badge pill className="p-2 badge-hover"
                        bg={category === selected ? "primary" : "secondary"}
                        onClick={() => changeSelected(category)}
                      >
                        {category}
                      </Badge>
                    </Link>
                  </li>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
          <Badge pill bg={searching ? "primary" : "light"}
            className="p-2 badge-hover mx-2"
            onClick={toggleFilter}
            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
          >
            {searching ? <CgClose /> : <FaSearch />}
          </Badge>
        </Container>
      </Navbar>

  );
}