import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {ActionType} from "../../Utils/redux/actions/types";
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import api, {urlImag} from "../../api/globalApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";
import Comment from "../../src/components/Comment/Comment";

const ProductScreen = ({product}) => {
    console.log(product)
    const classes = useStyle();
    const dispatch = useDispatch()
    const [clickedImg, setClickedImg] = useState(0)
    const [currentProduct, setCurrentProduct] = useState()

    useEffect(() => {
        product?.products.slice(0, 1).map((item) => {
            setCurrentProduct(item)
        })
    }, [product])
    console.log(currentProduct)
    const addToCartHandler = (data) => {
        dispatch({type: ActionType.ADD_TO_CARD, payload: data})
    }
    return (
        <Layout
            title={product.title}
            description={product.description}
        >
            <div className={classes.section}>
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
                <List>
                    <ListItem>
                        <Typography
                            component="h1"
                            variant="h1"
                        >
                            <strong>{product.title}</strong>
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <List>
                            <ListItem>
                                <Grid item xs={2}>
                                    <div>
                                        {currentProduct?.images.map((item, idx) => (
                                            <List key={item}>
                                                <img
                                                    src={item.image}
                                                    width={78}
                                                    height={100}
                                                    onClick={() => {
                                                        setClickedImg(idx)
                                                    }}
                                                />
                                            </List>
                                        ))}
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div>
                                        <img
                                            src={currentProduct?.images[clickedImg].image}
                                            width={400}
                                            height={540}
                                        />
                                    </div>
                                </Grid>
                            </ListItem>
                        </List>
                        <List>
                            <Typography
                                component='h1'
                                variant="h1"
                            >
                                <strong>
                                    Описание
                                </strong>
                            </Typography>
                            <Typography dangerouslySetInnerHTML={{__html: product.description}}/>
                        </List>
                    </Grid>
                    <Grid item xs={5}>
                        <List>
                            <ListItem>
                                <Typography
                                    component="h1"
                                    variant="h1"
                                    style={{margin: 0}}
                                >
                                    <strong>
                                        {currentProduct?.price} coм
                                    </strong>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid item xs={1}>
                                    <Typography>Sale:</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    {product.discount ? (
                                        <Avatar
                                            className={classes.globalColorYellow}
                                        >
                                            <Typography>
                                                -{product.discount}%
                                            </Typography>
                                        </Avatar>
                                    ) : (
                                        " "
                                    )}
                                </Grid>
                            </ListItem>
                            <Typography pl={2}>Цвет:</Typography>
                            <ListItem>
                                {product.products.map(item => (
                                    <div
                                        onClick={() => setCurrentProduct(item)}
                                        key={item.id}
                                        style={{margin: 2}}
                                    >
                                        <img
                                            src={item.images[0].image}
                                            width={78}
                                            height={100}
                                        />
                                    </div>
                                ))}
                            </ListItem>
                            <Typography pl={2} pt={1}>Размер:</Typography>
                            <ListItem style={{paddingLeft: 0, marginBottom: 10}}>
                                {product.products.slice(0, 1).map(item => (
                                    <ListItem key={item}>
                                        {item.sizes.map(itemSize => (
                                            <span
                                                key={itemSize}
                                                className={classes.sizeProducts}
                                            >
                                            {itemSize.size}
                                        </span>
                                        ))}
                                    </ListItem>
                                ))}
                            </ListItem>
                            <ListItem>
                                <Button
                                    size={"large"}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCartHandler(product)}
                                >
                                    Add to card
                                </Button>&nbsp;
                                <Avatar>
                                    <FavoriteBorderIcon
                                        onClick={() => dispatch(addToFavorite(product))}
                                        className={classes.favoriteBorderIconHover}
                                    />
                                </Avatar>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
            <Comment item={product}/>
        </Layout>
    );
};


export async function getStaticPaths() {
    const res = await api('/products')
    const posts = await res.data
    const paths = posts.results.map((product) => ({
        params: {id: product.id.toString()},
    }))
    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await api(`/products/${params.id}`)
    const product = await res.data

    return {props: {product}}
}

export default ProductScreen;

