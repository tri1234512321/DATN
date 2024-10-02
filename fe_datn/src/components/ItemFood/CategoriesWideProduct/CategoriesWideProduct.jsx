/** @format */
import React, { useState } from "react";

import "./CategoriesWideProduct.scss";
import comcakho1 from "../../../assets/comcakho/comcakho1.jpg";
import comgaluoc from "../../../assets/comgaluoc/comgaluoc1.jpg";
import comgaxe from "../../../assets/comgaxe/comgaxe2.jpg";
import comgaxoimo from "../../../assets/comgaxoimo/comgaxoimo1.jpg";
import comtam from "../../../assets/comtam/comtam7.jpg";

const CategoriesWideProduct = () => {
    const [clickedId, setClickedId] = useState(null);

    const handleClick = (id) => {
        setClickedId(id);
    };

    let categories = [
        { id: 1, title: "Cơm cá kho 1", image: comcakho1 },
        { id: 2, title: "Cơm gà luộc", image: comgaluoc },
        { id: 3, title: "Cơm gà xé", image: comgaxe },
        { id: 4, title: "Cơm gà xối mỡ", image: comgaxoimo },
        { id: 5, title: "Cơm tấm", image: comtam },
    ];

    const listCategories = categories.map((category) => (
        <div
            className={`border-item border-item-${category.id}`}
            key={category.id}
            onClick={() => handleClick(category.id)}
        >
            <div
                className={`item item-${category.id}`}
                key={category.id}
                style={{ border: clickedId === category.id ? "2px solid black" : "1px solid #d4d4d4" }}
            >
                <div
                    className={`image-item image-item-${category.id} relative`}
                    style={{
                        backgroundImage: `url(${category.image})`,
                    }}
                >
                    {/* <div className="absolute top-0 right-0 bg-[#e9dc4a] text-red-600 text-l font-normal py-[3px] px-[5px] text-center">-30%</div> */}
                    {/* <div className="absolute bottom-0 bg-[#8787878b] text-white text-xl font-normal w-full py-[3px] text-center">Đã bán 1,2k</div> */}
                </div>
                
                <div className={`title-item primary-text title-item-${category.id}`}>{category.title}</div>
                {/* <p className="text-center text-xl m-0 text-red-500">20.000 <sup>₫</sup></p> */}
            </div>
        </div>
    ));

    return (
        <div className='wrap-categories px-[auto]'>
            <div className='container-categories px-[15px] py-[20px] bg-white max-w-[1200px]'>
                <div className='title-categories primary-text'>Món ăn phổ biến được người dùng ưa thích</div>
                <div className='wrap-item-categories row'>{listCategories}</div>
            </div>
        </div>
    );
};

export default CategoriesWideProduct;
