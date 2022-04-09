import React from 'react';
import {Grid, List, ListItem, Typography} from "@mui/material";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReviewsIcon from "@mui/icons-material/Reviews";
import useStyle from "../../../../Utils/styles";

const ProfilePages = () => {
    const classes = useStyle();

    return (
        <Grid item md={3} xs={12}>
            <List>
                <ListItem className={classes.proFileBtns}>
                    <Typography pr={2}>
                        <NextLink href="">
                            <a className={classes.profileItems}>
                                <HomeIcon fontSize={"small"}/> Главная
                            </a>
                        </NextLink>
                    </Typography>
                    <Typography pr={2}>
                        <NextLink href="/purchases">
                            <a className={classes.profileItems}>
                                <ShoppingBagIcon fontSize={"small"}/> Покупки
                            </a>
                        </NextLink>
                    </Typography>
                    <Typography pr={2}>
                        <NextLink href="">
                            <a className={classes.profileItems}>
                                <ReviewsIcon fontSize={"small"}/> Отзывы
                            </a>
                        </NextLink>
                    </Typography>
                </ListItem>
            </List>
        </Grid>
    );
};

export default ProfilePages;