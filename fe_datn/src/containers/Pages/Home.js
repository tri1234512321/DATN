/** @format */

import React, { Component, Fragment, useState } from "react";
import Backgroundimg from "../../components/BackgroundImage/BackgroundImage";
import AllFoodItem from "../../components/AllFoodItem/AllFoodItem";
import CategoriesWideProduct from "../../components/ItemFood/CategoriesWideProduct/CategoriesWideProduct";
import CategoriesShop from "../../components/Shop/CategoriesShop/CategoriesShop";
import Footer from "../../components/Footer/Footer";
const Home = () => {
    return (
        <Fragment>
            <Backgroundimg />
            {/* <AllFoodItem /> */}
            {/* test tailwind */}
            <header className='App-header bg-blue-500 text-white p-4'>
                <h1 className='text-4xl font-bold'>Hello, Tailwind CSS!</h1>
                <p className='mt-2'>This is a simple example of using Tailwind CSS with React.</p>
                <button className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Click me</button>
            </header>
            <CategoriesShop />
            <CategoriesWideProduct />
            <Footer />
        </Fragment>
    );
};
export default Home;
