/** @format */

import React, { Component, Fragment, useState } from "react";
import Backgroundimg from "../../components/BackgroundImage/BackgroundImage";
import AllFoodItem from "../../components/AllFoodItem/AllFoodItem";
import CategoriesWideProduct from "../../components/ItemFood/CategoriesWideProduct/CategoriesWideProduct";
import CategoriesShop from "../../components/Shop/CategoriesShop/CategoriesShop";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    // <div className="bg-[#f6f3f3]">
    <div>
      <Backgroundimg />
        {/* <CategoriesShop /> */}
        {/* <CategoriesWideProduct /> */}
        <CategoriesWideProduct />
        <AllFoodItem />
      {/* <Footer /> */}
    </div>
  );
};
export default Home;
