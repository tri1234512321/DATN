/** @format */

import React, { Component, Fragment, useState } from "react";
import Backgroundimg from "../../components/BackgroundImage/BackgroundImage";
import AllFoodItem from "../../components/AllFoodItem/AllFoodItem";
import CategoriesWideProduct from "../../components/ItemFood/CategoriesWideProduct/CategoriesWideProduct";
import CategoriesShop from "../../components/Shop/CategoriesShop/CategoriesShop";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import im from "../../assets/images/banner.webp";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featureImageList = [{image:im},{image:im}];
  return (
    // <div className="bg-[#f6f3f3]">
    <div>
      {/* <Backgroundimg /> */}
        {/* <CategoriesShop /> */}
        {/* <CategoriesWideProduct /> */}
        <HomeHeader/>
        <div className="relative top-[30px] mb-[40px] w-full h-[350px] overflow-hidden max-w-[1200px] mx-auto">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
              <div>
                <img
                  src={slide?.image}
                  alt=""
                  key={index}
                  className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
                <Banner />
              </div>
              ))
            : null}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <CategoriesWideProduct />
        <AllFoodItem />
      {/* <Footer /> */}
    </div>
  );
};
export default Home;
