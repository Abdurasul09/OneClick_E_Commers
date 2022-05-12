import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Grid, List, ListItem,Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {Avatar, CircularProgress} from "@material-ui/core";
import {useDispatch} from "react-redux";
import api from "../../api/globalApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";
import Comment from "../../src/components/Comment/Comment";
import Image from 'next/image';
import {addToCartHandler} from "../../Utils/redux/actions/CartAction";


const ProductScreen = ({product}) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [clickedImg, setClickedImg] = useState(0)

    const [currentProduct, setCurrentProduct] = useState()
    useEffect(() => {
        product?.products.slice(0, 1).map((item) => {
            setCurrentProduct(item)
        })
    }, [product])

    const [size, setSize] = useState("")
    const [sizes, setSizes] = useState("")
    const onChangeValue = (event) => {
        setSize(event.target.value)
        localStorage.setItem('productsSize', size)
    }
    useEffect(() => {
        setSizes(localStorage.getItem('productsSize'))
    }, [size])

    return (
        <Layout
            title={product.title}
            description={product.description}
        >
            {product ? (
                <>
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
                                                        <Image
                                                            src={item.image}
                                                            width={78}
                                                            alt={item.title}
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
                                                    alt={currentProduct?.images[clickedImg].title}
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
                                                {product.price} coм
                                            </strong>
                                        </Typography>
                                        <Typography pl={2}>
                                            <del style={{color: "grey", fontSize: '18px'}}>
                                                {product.price} coм
                                            </del>
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Grid item xs={2}>
                                            <Typography>Скидка:</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {product.discount ? (
                                                <Avatar
                                                    className={classes.globalColorYellow}
                                                >
                                                    <Typography style={{color: "gray"}}>
                                                        -{product.discount}%
                                                    </Typography>
                                                </Avatar>
                                            ) : (
                                                " "
                                            )}
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid item xs={1}>
                                            <Typography>Цвет:</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {/*{currentProduct.color ? (*/}
                                            {/*    <Typography*/}
                                            {/*        pl={2}*/}
                                            {/*        color='#009688'>*/}
                                            {/*        {currentProduct.color}*/}
                                            {/*    </Typography>*/}
                                            {/*) : (" ")}*/}
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        {product.products.map(item => (
                                            <div
                                                onClick={() => setCurrentProduct(item)}
                                                key={item.id}
                                                style={{margin: 2}}
                                            >
                                                <Image
                                                    alt={item.images[0].title}
                                                    src={item.images[0].image}
                                                    width={78}
                                                    height={100}
                                                />
                                            </div>
                                        ))}
                                    </ListItem>
                                    <Typography pl={2} pt={1}>Размер: {sizes} </Typography>
                                    <ListItem style={{marginBottom: 10}}>
                                        <form className={classes.flex}>
                                            {currentProduct?.sizes.map(itemSize => (
                                                <div key={itemSize} className='form_radio_btn'>
                                                    <label
                                                        key={itemSize.size}
                                                        htmlFor={`${itemSize.size}`}
                                                        style={{
                                                            borderColor: sizes === itemSize.size ? "red" : null,
                                                            color: sizes === itemSize.size ? "red" : null
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            onChange={onChangeValue}
                                                            id={`${itemSize.size}`}
                                                            name="inputRadios"
                                                            value={`${itemSize.size}`}
                                                        />
                                                        {itemSize.size}
                                                    </label>
                                                </div>
                                            ))}
                                        </form>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            size={"large"}
                                            variant="contained"
                                            color={"primary"}
                                            onClick={() => {
                                                product.photo = currentProduct
                                                product.size = size
                                                dispatch(addToCartHandler(product))
                                            }
                                            }
                                        >
                                            Добавить в корзину
                                        </Button>&nbsp;
                                        <Avatar
                                            className={classes.globalColorYellow}
                                        >
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
                </>
            ) : (
                 <CircularProgress/>
                )}
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

