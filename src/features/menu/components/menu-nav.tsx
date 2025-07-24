import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Search, X } from 'lucide-react';
import { Link } from "react-scroll";
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/components/ui/button';
import { Input } from "../../../components/ui/input";
import { useMenuContext } from "../service/menuService";
import NavButton from "@/components/ui/nav-button";

export default function MenuNav() {
  const { categorizedItems, setFilter } = useMenuContext();
  const categories = Object.keys(categorizedItems);
  const [selected, setSelected] = useState<string>();
  const [swiper, setSwiper] = useState<any>(null);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    if (categories.length > 0 && !selected) {
      setSelected(categories[0]);
    }
  }, [categories, selected]);

  const changeSelected = (category: string) => {
    setSelected(category)
    if (swiper && typeof swiper.slideTo === 'function') {
      swiper.slideTo(categories.indexOf(category))
    } else {
      console.warn('Swiper instance is not initialized');
    }
  }

  const toggleFilter = () => {
    if (searching) {
      setFilter("")
    }
    setSearching(!searching)
  }

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  if (!selected) {
    return null; // or a loading state
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-background border-b border-t h-16 pt-[env(safe-area-inset-top)]"
    >
      <div className="container mx-auto flex items-center h-full px-2">
        {searching && (
          <Input
            autoFocus
            type="text"
            placeholder="Zoeken"
            className="w-full rounded-full  px-4 py-2 mx-1 me-2 my-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={onSearch}
          />
        )}
        <Swiper
          className={searching ? "hidden" : ""}
          slidesPerView="auto"
          direction="horizontal"
          onSwiper={setSwiper}
          preventClicks={false}
        >
          <ul className="flex">
            {categories.map((category) => (
              <SwiperSlide style={{ width: "unset" }} key={category}>
                <li className="m-2" key={category}>
                  <Link
                    key={category.toLowerCase()}
                    spy
                    hashSpy={false}
                    duration={300}
                    smooth={true}
                    to={category.toLowerCase()}
                    offset={-76}
                    spyThrottle={300}
                    onSetActive={() => changeSelected(category)}
                  >
                    <NavButton
                      visible={(selected === category) || false}
                      variant={selected === category ? "default" : "ghost"}
                      className={`px-4 py-2 rounded-full`}
                      data-slot="category-badge"
                    >
                      {category}
                    </NavButton>
                  </Link>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
        <Button
          variant={searching ? "default" : "outline"}
          className={`ml-2 rounded-full flex items-center justify-center p-2 h-9 w-9`}
          onClick={toggleFilter}
          data-slot="search-toggle"
        >
          {searching ? <X size={16} /> : <Search size={16} />}
        </Button>
      </div>
    </nav>
  );
}