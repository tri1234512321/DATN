/** @format */

import { Modal } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./Banner.scss";

const Banner = () => {
    return (
        <div className='wrap-banner col-12'>
            <div className='container-banner relative'>
                <div className='wrap-top-banner'>
                    <div className='content-top-banner col-6'>
                        <div className='col-10 text-shadow primary-text'>
                            Chào mừng bạn đến với FFOOD, món ăn bạn muốn đang ở đây.
                        </div>
                    </div>
                </div>
                <div className='wrap-center-banner d-flex'>
                    <div className='wrap-banner-left d-flex col-6'>
                        <div className='container-banner-left'>
                            <div className='content-banner-left'>
                                <h1>Left banner</h1>
                            </div>
                        </div>
                    </div>
                    <div className='wrap-banner-right d-flex col-6'>
                        <div className='container-banner-right'>
                            <div className='content-banner-right'>
                                <h1>Right banner</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wrap-bottom-banner'>
                    <div className='content-bottom-banner col-7'>bottom banner</div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
