import React from "react";
import Form from "./Form/Form";
import classes from '../Content/Content.module.css'

const Content = () => {
    return (
        <div className={classes.content}>
            <Form/>
        </div>
    )
}

export default Content;