/** @format */
import React, { useState } from "react";

import "./CategoriesShop.scss";
import shop1 from "../../../assets/categoriesShop/shop1.jpg";
import shop2 from "../../../assets/categoriesShop/shop2.jpg";
import shop3 from "../../../assets/categoriesShop/shop3.jpg";
import shop4 from "../../../assets/categoriesShop/shop4.jpg";
import shop5 from "../../../assets/categoriesShop/shop5.jpg";
import shop6 from "../../../assets/categoriesShop/shop6.jpg";

const CategoriesShop = () => {
    const [clickedId, setClickedId] = useState(null);

    const handleClick = (id) => {
        setClickedId(id);
    };

    let categories = [
        { id: 1, title: "Shop 1", image: shop1 },
        { id: 2, title: "Shop 2", image: shop2 },
        { id: 3, title: "Shop 3", image: shop3 },
        { id: 4, title: "Shop 4", image: shop4 },
        { id: 5, title: "Shop 5", image: shop5 },
        { id: 6, title: "Shop 6", image: shop6 },
    ];

    const listCategories = categories.map((category) => (
        <div
            className={`border-item border-item-${category.id}`}
            key={category.id}
            onClick={() => handleClick(category.id)}
        >
            <div className={`item item-${category.id}`} key={category.id}>
                <div
                    className={`image-item image-item-${category.id}`}
                    style={{
                        backgroundImage: `url(${category.image})`,
                    }}
                ></div>
                <div className={`title-item primary-text title-item-${category.id}`}>{category.title}</div>
            </div>
        </div>
    ));

    return (
        <div className='wrap-categories-shop'>
            <div className='container-categories'>
                <div className='title-categories primary-text'>Quán ăn có lượt đánh giá tốt nhất</div>
                <div className='wrap-item-categories row'>{listCategories}</div>
            </div>
        </div>
    );
};

export default CategoriesShop;
