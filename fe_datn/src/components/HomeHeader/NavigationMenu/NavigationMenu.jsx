/** @format */

import React from "react";
import "./NavigationMenu.scss";

import close from "../../../assets/close.png";
import more from "../../../assets/more.png";

function NavigationMenu({ isOpen, toggleMenu }) {
    console.log("navigation menu: ", isOpen);
    return (
        <>
            {isOpen && <div className='overlay' onClick={toggleMenu}></div>}
            <div className={`navigation-menu ${isOpen ? "open" : ""}`}>
                <div className='wrap-side-bar'>
                    <div className='side-bar'>
                        <div className='head-bar'>
                            <p className='name'>FFOOD</p>
                            <div className='icon close-button' onClick={toggleMenu}>
                                <img src={close} alt='close' />
                            </div>
                        </div>
                        <div className='category'>
                            <p className='name'>Browse Categories</p>
                        </div>
                        <div className='shop'>
                            <p className='name'>Jewelry & Accessories</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Clothing & Shoes</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Home & Living</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Wedding & Party</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Jewelry & Accessories</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Clothing & Shoes</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Home & Living</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                        <div className='shop'>
                            <p className='name'>Wedding & Party</p>
                            <div className='icon'>
                                <img src={more} alt='more' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavigationMenu;
