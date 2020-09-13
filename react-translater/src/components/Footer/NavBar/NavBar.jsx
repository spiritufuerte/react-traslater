import React from "react";
import classes from '../NavBar/NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return(
        <nav className={classes.nav}>
            <a href="#">Про нас</a>
            <a href="#">Ціни</a>
            <a href="#">Редактори</a>
            <a href="#">Блог</a>
        </nav>
    )
}

export default NavBar;