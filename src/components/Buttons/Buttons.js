import React from 'react';
import NextLink from "next/link";
import {Button, Typography} from "@mui/material";
import useStyle from "../../../Utils/styles";

const Buttons = () => {
    const classes = useStyle();
    return (
        <div className={classes.btns}>
            <NextLink href="#">
                <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                >
                    <Typography>Назад</Typography>
                </Button>
            </NextLink>
            <NextLink href="/">
                <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                >
                    <Typography>Главная</Typography>
                </Button>
            </NextLink>
        </div>
    );
};

export default Buttons;