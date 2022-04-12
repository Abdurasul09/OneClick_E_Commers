import React from 'react';
import Layout from "../../src/components/Layout"
import NextLink from "next/link";
import {Button, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
const Categories = () => {
    const classes = useStyle();

    return (
        <Layout title="Категория">
            <div className={classes.loginBtn}>
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
                <Typography>Главная / Женщинам</Typography>
            </div>
        </Layout>
    );
};

export default Categories;