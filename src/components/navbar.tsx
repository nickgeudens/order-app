import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Search, X } from 'lucide-react';
import { Link } from "react-scroll";
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/components/ui/button';
import { Input } from "./ui/input";

interface CategoryNavbarProps {
  categories: string[];
  setFilter: (filter: string) => void;
}

export default function CategoryNavbar(props: CategoryNavbarProps) {
  const [selected, setSelected] = useState<string>(props.categories[0]);
  const [swiper, setSwiper] = useState<any>(null);
  const [searching, setSearching] = useState<boolean>(false);

  const changeSelected = (category: string) => {
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

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    window.scrollTo(0, 90)
    props.setFilter(event.target.value)
  }

  return (
    <nav className="sticky top-0 bg-background border-b-1 border-t-1 py-0 h-16 z-10">
      <div className="container mx-auto flex items-center h-full px-2">
        {searching ? (
          <Input
            autoFocus
            type="text"
            placeholder="Zoeken"
            className="w-full rounded-full  px-4 py-2 mx-1 me-2 my-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                    smooth={true}
                    to={category.toLowerCase()}
                    offset={-76}
                    spyThrottle={300}
                    onSetActive={() => changeSelected(category)}
                  >
                    <Button
                      variant={selected === category ? "default" : "ghost"}
                      className={`px-4 py-2 rounded-full`}
                      data-slot="category-badge"
                    >
                      {category}
                    </Button>
                  </Link>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
        <Button
          variant={searching ? "default" : "outline"}
          className={`ml-2 rounded-full aspect-square flex items-center justify-center p-2`}
          onClick={toggleFilter}
          data-slot="search-toggle"
        >
          {searching ? <X size={16} /> : <Search size={16} />}
        </Button>
      </div>
    </nav>
  );
}