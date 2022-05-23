import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {Avatar, CircularProgress, IconButton, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import api from "../../api/globalApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";
import Comment from "../../src/components/Comment/Comment";
import Image from 'next/image';
import {addToCartHandler, addToCartProductPrice} from "../../Utils/redux/actions/CartAction";
import ShareIcon from '@mui/icons-material/Share';
import {useSnackbar} from "notistack";
import Modal from "../../src/components/Ocno";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Buttons from "../../src/components/Buttons/Buttons";

const ProductScreen = ({product}) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [clickedImg, setClickedImg] = useState(0)
    const [currentProduct, setCurrentProduct] = useState()
    const [cartProduct, setCartProduct] = useState(currentProduct)
    const [size, setSize] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const sendUrl = `https://mui.com/store/previews/onepirate/`

    console.log(product)
    useEffect(() => {
        if (!currentProduct) return
        setCartProduct(currentProduct)
    }, [size])

    useEffect(() => {
        product?.products.slice(0, 1).map((item) => {
            item.quantity = 0
            item.price = product.price
            setCurrentProduct(item)
        })
        dispatch(addToCartProductPrice(product))
    }, [product])

    const buy = () => {
        if (!size) {
            enqueueSnackbar("Выберите размер !!!", {variant: 'error'})
            return
        }
        try {
            cartProduct.sizes = size
            return dispatch(addToCartHandler(cartProduct))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout
            title={product.title}
            description={product.description}
        >
            {product ? (
                <>
                    <div className={classes.section}>
                        <Buttons/>
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
                                            {currentProduct?.color ? (
                                                <Typography
                                                    pl={2}
                                                    color='#009688'>
                                                    {currentProduct.color}
                                                </Typography>
                                            ) : (" ")}
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
                                    <Typography pl={2} pt={1}>Размер: {size ? size : 'ne vybrano'} </Typography>
                                    <ListItem style={{marginBottom: 10}}>
                                        <form className={classes.flex}>
                                            {currentProduct?.sizes.map(itemSize => (
                                                <div key={itemSize} className='form_radio_btn'>
                                                    <label
                                                        key={itemSize.size}
                                                        htmlFor={`${itemSize.size}`}
                                                        style={{
                                                            backgroundColor: size === itemSize.size ? "#0a0c0c" : null,
                                                            color: size === itemSize.size ? "#ffffff" : null
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            onChange={(e) => setSize(e.target.value)}
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
                                        <button
                                            className='btnCart'
                                            onClick={() => {
                                                buy()
                                            }}
                                        >
                                            Добавить в корзину
                                        </button>
                                        <button
                                            className='btnFav'
                                            onClick={() => dispatch(addToFavorite(product))}
                                        >
                                            <FavoriteBorderIcon fontSize={"small"}/>&nbsp; Избранное
                                        </button>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>
                                            Артикул: 65634576527
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>
                                            Продавец: Алиса Анарбаева
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <NextLink href={`/stores/${product.id}`}>
                                            <a>
                                                <button className='btnFav'>
                                                    Перейти в магазине
                                                </button>
                                            </a>
                                        </NextLink>&nbsp;
                                        <IconButton
                                            onClick={() => setModalActive(true)}
                                        >
                                            <ShareIcon/>
                                        </IconButton>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <List>
                            <ListItem>
                                <Typography component='h1' variant='h1'>С товаром рекомендуют</Typography>
                            </ListItem>
                        </List>
                    </div>
                    <Comment item={product}/>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <List>
                            <Typography component='h1' variant='h1'>Поделиться</Typography>
                            <ListItem>
                                <NextLink href='https://www.youtube.com/'>
                                    <a>
                                        <YouTubeIcon
                                            style={{fontSize: '100px'}}
                                            fontSize={"large"}
                                        />
                                    </a>
                                </NextLink>&nbsp;
                                <NextLink href='https://www.instagram.com/'>
                                    <a>
                                        <InstagramIcon
                                            style={{fontSize: '70px'}}
                                            fontSize={"large"}
                                        />
                                    </a>
                                </NextLink>&nbsp;
                                <NextLink href='https://www.facebook.com/'>
                                    <a>
                                        <FacebookIcon
                                            style={{fontSize: '80px'}}
                                            fontSize={"large"}
                                        />
                                    </a>
                                </NextLink>&nbsp;
                                <NextLink href='https://www.whatsapp.com/'>
                                    <a>
                                        <WhatsAppIcon
                                            style={{fontSize: '70px'}}
                                            fontSize={"large"}
                                        />
                                    </a>
                                </NextLink>
                            </ListItem>
                            <ListItem>
                                <input
                                    type="text"
                                    className='url'
                                    value={sendUrl}
                                />
                                <button className='btnCart'
                                    onClick={ async (event) => await navigator.clipboard.writeText(sendUrl)}
                                >
                                    Копировать
                                </button>
                            </ListItem>
                        </List>
                    </Modal>
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

