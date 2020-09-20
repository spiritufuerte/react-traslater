import React from "react";
import classes from '../Footer/Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <nav className={classes.nav}>
                <div className={classes.nav_item}><a href="https://www.facebook.com/correctarium/">Facebook</a></div>
                <div className={classes.nav_item}><a href="mailto:manager@correctarium.com">manager@correctarium.com</a></div>
            </nav>
            <div className={classes.lang_selector}>
                <button>Українська</button>
                <button>Російська</button>
            </div>
        </footer>
    )
}

export default Footer;