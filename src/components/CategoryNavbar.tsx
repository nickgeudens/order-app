import React, { useState } from "react";
import { BadgeSearch, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export interface CategoryNavbarProps {
  categories: string[];
  setFilter: (value: string) => void;
}

export function CategoryNavbar({ categories, setFilter }: CategoryNavbarProps) {
  const [selected, setSelected] = useState(categories[0]);
  const [swiper, setSwiper] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  const changeSelected = (category: string) => {
    setSelected(category);
    if (swiper) {
      swiper.slideTo(categories.indexOf(category));
    }
  };

  const toggleFilter = () => {
    if (searching) {
      setFilter("");
    }
    setSearching(!searching);
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    window.scrollTo(0, 90);
    setFilter(event.target.value);
  };

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
            {categories.map((category) => (
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
                      className={cn(
                        "px-4 py-2 rounded-full cursor-pointer transition-colors",
                        selected === category
                          ? "bg-primary text-white"
                          : "bg-secondary text-zinc-800 dark:bg-zinc-700 dark:text-white hover:bg-primary/80 hover:text-white"
                      )}
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
        <button
          type="button"
          className={cn(
            "ml-2 rounded-full border border-zinc-200 dark:border-zinc-700 p-2 transition-colors",
            searching ? "bg-primary text-white" : "bg-zinc-100 dark:bg-zinc-800"
          )}
          onClick={toggleFilter}
          data-slot="search-toggle"
        >
          {searching ? <X size={18} /> : <BadgeSearch size={18} />}
        </button>
      </div>
    </nav>
  );
}
