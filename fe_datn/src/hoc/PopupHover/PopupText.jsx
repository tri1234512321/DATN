/** @format */

import React, { useState } from "react";
import "./PopupText.scss";

const Popup = ({ text, position, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    console.log("position: ", position);
    return (
        <div
            className='popup-container'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            {isHovered && (
                <div
                    className='popup-text'
                    style={{
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Popup;
