import Layout from "../src/components/Layout";
import {
    Button,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid, IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import Advertising from "../src/components/Advertising/Advertising";
import Shops from "../src/components/Shops/Shops";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {useDispatch} from "react-redux";
import React from "react";
import api, {urlImag} from "../api/globalApi";
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

const Home = ({products}) => {
    console.log(products)
    const dispatch = useDispatch()
    const classes = useStyle();
    const shadowStyles = useSoftRiseShadowStyles();
    return (
        <>
            <Layout>
                <Advertising/>
                <Shops/>
                <div className={classes.card}>
                    <Typography component="h1" variant="h1">
                        <strong>Хиты продаж</strong>
                    </Typography>
                    <Grid container spacing={5}>
                        {products.results.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card
                                    variant={"outlined"}
                                    style={{border: "none"}}
                                    className={(shadowStyles.root)}
                                >
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className={classes.productImage}
                                                image={`${urlImag + product.image}`}
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
                                        <ListItem>
                                            <Typography>
                                                {product.title}
                                            </Typography>
                                        </ListItem>
                                        <ListItem className={classes.priceFavoriteIcon}>

                                            {product.discount_price ? (
                                                    <div className={classes.flex}>
                                                        <Typography>
                                                            <strong>{product.discount_price} coм</strong>
                                                        </Typography>
                                                        <Typography pl={2}>
                                                            <del style={{color: "grey"}}>
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
                                            <Typography className={classes.cardTitleIcon}>
                                                <IconButton edge="end">
                                                    <FavoriteBorderIcon
                                                        onClick={() => dispatch(addToFavorite(product))}
                                                        className={classes.favoriteBorderIconHover}
                                                    />
                                                </IconButton>
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => dispatch(addToCartHandler(product))}
                                        >
                                            Добавить в корзину
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Layout>
        </>
    )
}

export default Home;

export async function getStaticProps() {
    const res = await api('/products')
    const products = await res.data
    return { props: { products } }
}