import React from 'react';
import api from "../api/globalApi";
import {Grid, Link, List, ListItem} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Button, CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import useStyle from "../Utils/styles";
import NextLink from "next/link";
import {grey} from "@material-ui/core/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useDispatch} from "react-redux";

const Rec = ({products}) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    return (
        <div>
            <Grid container spacing={5}>
                {products.results.map(product => (
                    <>
                        {product.products.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card>
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className={classes.productImage}
                                                image={product.image}
                                                title={product.title}
                                            />
                                            {product.discount ? (
                                                <span
                                                    className={classes.productDiscount}
                                                >
                                                -{product.discount}%
                                            </span>
                                            ) : (
                                                " "
                                            )}
                                        </CardActionArea>
                                    </NextLink>
                                    <List style={{paddingBottom: 0}}>
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography sx={{ color: grey[600] }}>
                                                {product.title}
                                            </Typography>
                                            <FavoriteBorderIcon
                                                onClick={() => dispatch(addToFavorite(product))}
                                                className={classes.favoriteBorderIconHover}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            {product.discount_price ? (
                                                <div className={classes.flex}>
                                                    <Typography>
                                                        <strong>{product.discount_price} coм</strong>
                                                    </Typography>
                                                    <Typography pl={2}>
                                                        <del style={{color: "grey", fontSize: '13px'}}>
                                                            {product.price} coм
                                                        </del>
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <Typography>
                                                    <strong>
                                                        {product.price} coм
                                                    </strong>
                                                </Typography>
                                            )}
                                        </ListItem>
                                    </List>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color={'primary'}
                                            onClick={() => dispatch(addToCartHandler(product))}
                                        >
                                            Добавить в корзину
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </>
                ))}
            </Grid>
        </div>
    );
};

export default Rec;

export async function getServerSideProps() {
    const res = await api.get(`/collections/`)
    const products = await res.data
    return {props: {products}}
}
