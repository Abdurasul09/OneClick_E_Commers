import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {Grid, Link, List, ListItem} from "@material-ui/core";
import useStyle from "../../../Utils/styles";
import NextLink from "next/link";
import api from "../../../api/globalApi";
import {useEffect, useState} from "react";
import {grey} from "@material-ui/core/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../../Utils/redux/actions/FavoriteAction";
import {addToCartHandler} from "../../../Utils/redux/actions/CartAction";
import {useDispatch} from "react-redux";

export const Recommend = () => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    useEffect(() => {
        api('/collections')
            .then(res => setProducts(res.data))
    },[])
    const classes = useStyle();
    return (
        <div>
            <NextLink href="/rec" passHref>
                <Link>
                    {products.results?.map(el => (
                        <Typography
                            key={el.id}
                            py={2}
                            className={classes.brand}
                        >
                            {el.name}
                        </Typography>
                    ))}
                </Link>
            </NextLink>
            <Grid container spacing={5}>
                {products.results?.map(productItem => (
                    <>
                        {productItem.products.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card variant="outlined" style={{border: "none"}}>
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
                                </Card>
                                <List style={{paddingBottom: 0}}>
                                    <ListItem
                                        style={{padding:0}}
                                    >
                                        <Typography sx={{ color: grey[600] }}>
                                            {product.title}
                                        </Typography>
                                    </ListItem>
                                    <ListItem
                                        style={{padding:0}}
                                    >
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
                            </Grid>
                        ))}
                    </>
                ))}
            </Grid>
        </div>
    );
}

