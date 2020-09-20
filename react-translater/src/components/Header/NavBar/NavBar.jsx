import React from "react";
import classes from './NavBar.module.css';

const NavBar = () => {
    return(
        <nav className={classes.nav}>
            <a href="#"><img src="https://correctarium.com/img/cr_logo_w.svg" alt="Logo" title="Logo"/></a>
            <a href="#">Про нас</a>
            <a href="#">Ціни</a>
            <a href="#">Редактори</a>
            <a href="#">Блог</a>
        </nav>
    )
}

export default NavBar;