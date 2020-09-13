import React from "react";
import classes from './Header.module.css';
import NavBar from "../Footer/NavBar/NavBar";

const Header = () => {
    return(
        <header className={classes.header}>
            <img src="https://correctarium.com/img/cr_logo_w.svg" alt="Logo" title="Logo"/>
            <NavBar/>
            <button>Перевірити текст</button>
        </header>
    );
}
export default Header;