import React from 'react';
import Layout from "../src/components/Layout";
import useStyle from "../Utils/styles";
import {Button, CardActionArea, CardActions, CardMedia, Grid, List, ListItem, Typography} from "@mui/material";
import NextLink from "next/link";
import Card from "@mui/material/Card";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useDispatch, useSelector} from "react-redux";

const Favorite = () => {
    const dispatch = useDispatch;
    const {favorite}= useSelector(state => state.favorite);
    const classes = useStyle();

    return (
        <Layout>
            <div className={classes.card}>
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
                <Typography component="h2" variant="h2">Favorite</Typography>
                {favorite.length === 0 ? (
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        Cart is empty
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {favorite.map(item => (
                            <Grid item md={3} key={item.id}>
                                <Card>
                                    <NextLink href={`/product/${item.id}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={item.image}
                                                title={item.title}
                                            />
                                        </CardActionArea>
                                    </NextLink>
                                    <List>

                                        <ListItem className={classes.priceFavoriteIcon}>
                                            {item.category}
                                            <Typography>
                                                ${item.price}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => dispatch(addToCartHandler(item))}
                                        >
                                            Добавить в корзину
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

            </div>
        </Layout>
    );
};

export default Favorite;