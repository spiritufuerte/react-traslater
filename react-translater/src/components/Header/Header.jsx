import React from "react";
import classes from './Header.module.css';
import NavBar from "./NavBar/NavBar";

const Header = () => {
    return(
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.container_element}>
                <NavBar/>
                </div>
            <button>Перевірити текст</button>
            </div>
        </header>
    );
}
export default Header;