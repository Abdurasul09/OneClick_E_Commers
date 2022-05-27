import React from 'react';
import NextLink from "next/link";
import useStyle from "../../../Utils/styles";

const Buttons = () => {
    const classes = useStyle();
    return (
        <div className={classes.btns}>
            <NextLink href="#">
                <button className='btnCart'>
                  Назад
                </button>
            </NextLink>
            <NextLink href="/">
                <button className='btnCart'>
                    Главная
                </button>
            </NextLink>
        </div>
    );
};

export default Buttons;