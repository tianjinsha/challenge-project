import React from "react";
import {Link} from "react-router-dom";
import './style.css'


const Menu = () => {
    return (
        <nav className="nav">
            <ul className="nav-wrapper">
                <li><Link to="/">home</Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/help">help</Link></li>
                <li><Link to="/topics">topics</Link></li>
            </ul>
        </nav>
    )
}

export default Menu;
