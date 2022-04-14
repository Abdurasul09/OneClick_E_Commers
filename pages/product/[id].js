import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Card, Grid, IconButton, List, ListItem, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {ActionType} from "../../Utils/redux/actions/types";
import axios from "axios";
import {useSnackbar} from "notistack";
import {CircularProgress, Link, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/globalApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";

const ProductScreen = ({product}) => {
    console.log(product)
    const classes = useStyle();
    const dispatch = useDispatch()
    const [clickedImg, setClickedImg] = useState(0)
    // const {userInfo} = useSelector(state => state.user)
    // const {enqueueSnackbar} = useSnackbar();
    const addToCartHandler = (data) => {
        dispatch({type: ActionType.ADD_TO_CARD, payload: data})
    }
    // const [comment, setComment] = useState('')
    // const [reviews, setReviews] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         await axios.post("https://oneclickback.herokuapp.com/comments", {
    //             id: 1,
    //             parent: 1,
    //             description: comment,
    //             user: 2,
    //             product: 1
    //         },)
    //         setLoading(false);
    //         enqueueSnackbar('Review submitted successfully', {variant: 'success'});
    //         fetchReviews();
    //     } catch (err) {
    //         setLoading(false);
    //         enqueueSnackbar("Error", {variant: 'error'});
    //     }
    // };

    // const fetchReviews = async () => {
    //     try {
    //         const {data} = await axios.get("https://oneclickback.herokuapp.com/comments")
    //         setReviews(data);
    //         console.log(data)
    //     } catch (err) {
    //         enqueueSnackbar("Error", {variant: 'error'});
    //     }
    // };
    // useEffect(() => {
    //     fetchReviews()
    // }, []);

    console.log(clickedImg)
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
                        {product?.products.slice(0, 1).map(el => (
                            <List key={el.id}>
                                <ListItem>
                                    <Grid item xs={2}>
                                        <div>
                                            {el.images.map((item, idx) => (
                                                <List key={item}>
                                                    <img
                                                        src={`http://39ec-46-251-221-21.ngrok.io${item.image}`}
                                                        width={78}
                                                        height={100}
                                                        onClick={() => {
                                                            console.log(999, clickedImg)
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
                                                src={`http://39ec-46-251-221-21.ngrok.io${el.images[clickedImg].image}`}
                                                width={400}
                                                height={540}
                                            />
                                        </div>
                                    </Grid>
                                </ListItem>
                            </List>
                        ))}

                        <List>
                            <ListItem>
                                <Typography
                                    component='h1'
                                    variant="h1"
                                >
                                    <strong>
                                        Описание
                                    </strong>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography dangerouslySetInnerHTML={{__html: product.description}}/>
                            </ListItem>
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
                            </ListItem>
                            <ListItem>
                                <Grid item xs={1}>
                                    <Typography>Sale:</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    {product.discount ? (
                                        <Typography color={"crimson"}>
                                            -{product.discount}%
                                        </Typography>
                                    ) : (
                                        " "
                                    )}
                                </Grid>
                            </ListItem>
                            <Typography pl={2}>Цвет:</Typography>
                            <ListItem>
                                    {product.products.map(item => (
                                        <div key={item.id} style={{margin: 2}}>
                                            <img
                                                src={`http://39ec-46-251-221-21.ngrok.io${item.images[0].image}`}
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
                                <IconButton edge="end" size={"medium"}>
                                    <FavoriteBorderIcon
                                        onClick={() => dispatch(addToFavorite(product))}
                                        className={classes.favoriteBorderIconHover}
                                    />
                                </IconButton>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
            {/*<List>*/}
            {/*    <ListItem>*/}
            {/*        <Typography name="reviews" id="reviews" variant="h2">*/}
            {/*            Customer Reviews*/}
            {/*        </Typography>*/}
            {/*    </ListItem>*/}
            {/*    {reviews.length === 0 && <ListItem>No review</ListItem>}*/}
            {/*    {reviews.map((review) => (*/}
            {/*        <ListItem key={review.id}>*/}
            {/*            <Grid container>*/}
            {/*                <Grid item className={classes.reviewItem}>*/}
            {/*                    <Typography>*/}
            {/*                        <strong>{review.name}</strong>*/}
            {/*                    </Typography>*/}
            {/*                </Grid>*/}
            {/*                <Grid item>*/}
            {/*                    <Typography>{review.description}</Typography>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*    <ListItem>*/}
            {/*        {userInfo ? (*/}
            {/*            <form onSubmit={submitHandler} className={classes.reviewForm}>*/}
            {/*                <List>*/}
            {/*                    <ListItem>*/}
            {/*                        <Typography variant="h2">Leave your review</Typography>*/}
            {/*                    </ListItem>*/}
            {/*                    <ListItem>*/}
            {/*                        <TextField*/}
            {/*                            multiline*/}
            {/*                            variant="outlined"*/}
            {/*                            fullWidth*/}
            {/*                            name="review"*/}
            {/*                            label="Enter comment"*/}
            {/*                            value={comment}*/}
            {/*                            onChange={(e) => setComment(e.target.value)}*/}
            {/*                        />*/}
            {/*                    </ListItem>*/}
            {/*                    <ListItem>*/}
            {/*                        <Button*/}
            {/*                            type="submit"*/}
            {/*                            fullWidth*/}
            {/*                            variant="contained"*/}
            {/*                            color="primary"*/}
            {/*                        >*/}
            {/*                            Submit*/}
            {/*                        </Button>*/}
            {/*                        {loading && <CircularProgress/>}*/}
            {/*                    </ListItem>*/}
            {/*                </List>*/}
            {/*            </form>*/}
            {/*        ) : (*/}
            {/*            <Typography variant="h2">*/}
            {/*                Please{' '}*/}
            {/*                <Link href="/login">*/}
            {/*                    login*/}
            {/*                </Link>{' '}*/}
            {/*                to write a review*/}
            {/*            </Typography>*/}
            {/*        )}*/}
            {/*    </ListItem>*/}
            {/*</List>*/}

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

