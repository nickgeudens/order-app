import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Search, X } from 'lucide-react';
import { Link } from "react-scroll";
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/components/ui/button';

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

  const onSearch = event => {
    window.scrollTo(0, 90)
    props.setFilter(event.target.value)
  }

  return (
    <nav className="sticky top-0 bg-white dark:bg-zinc-900 shadow-sm py-0 h-16 z-10">
      <div className="container mx-auto flex items-center h-full px-2">
        {searching ? (
          <input
            autoFocus
            type="text"
            placeholder="Zoeken"
            className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 mx-1 me-2 my-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={onSearch}
          />
        ) : null}
        <Swiper
          className={searching ? "hidden" : ""}
          slidesPerView="auto"
          direction="horizontal"
          onSwiper={setSwiper}
          preventClicks={false}
        >
          <ul className="flex">
            {props.categories.map((category) => (
              <SwiperSlide style={{ width: "unset" }} key={category}>
                <li className="m-2" key={category}>
                  <Link
                    key={category.toLowerCase()}
                    spy
                    hashSpy
                    duration={300}
                    to={category.toLowerCase()}
                    offset={-76}
                    spyThrottle={300}
                    onSetActive={() => changeSelected(category)}
                  >
                    <span
                      className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${selected === category ? 'bg-primary text-white' : 'bg-secondary text-zinc-800 dark:bg-zinc-700 dark:text-white hover:bg-primary/80 hover:text-white'}`}
                      data-slot="category-badge"
                    >
                      {category}
                    </span>
                  </Link>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
        <Button
          variant={searching ? "primary" : "secondary"}
          className={`ml-2 rounded-full border border-zinc-200 dark:border-zinc-700 p-2 transition-colors ${searching ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-zinc-800'}`}
          onClick={toggleFilter}
          data-slot="search-toggle"
        >
          {searching ? <X size={18} /> : <Search size={18} />}
        </Button>
      </div>
    </nav>
  );
}