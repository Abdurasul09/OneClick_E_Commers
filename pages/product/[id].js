import React, { useEffect, useState} from 'react';
import {useRouter} from "next/router";
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Card, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {ActionType} from "../../Utils/redux/actions/types";
import data from '../../Utils/data'
import axios from "axios";
import {useSnackbar} from "notistack";
import {CircularProgress, Link, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

const ProductScreen = ({product}) => {
    console.log(product)
    const classes = useStyle();
    const dispatch = useDispatch()
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


    return (
        <Layout title={product.title} description={product.description}>
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
                        <Typography component="h1" variant="h1">{product.title}</Typography>
                    </ListItem>
                </List>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        {product?.products.map(el => (
                            <div key={el}>
                                {el.images.map(item => (
                                    <>
                                        <img
                                            src={`http://ca17-46-251-212-202.ngrok.io${item.image}`}
                                            alt={product.title}
                                            width={400}
                                            height={540}
                                            layout="responsive"
                                            style={{objectFit: "cover"}}
                                        />
                                    </>
                                ))}
                            </div>
                        ))}
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">$ {product.price}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Размер:</Typography>
                            </ListItem>
                            <ListItem>
                                {product.products.map(el => (
                                    <div key={el}>
                                        {el.sizes.map(item => (
                                            <div key={item}>
                                                <Typography
                                                >
                                                    {item.size}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Grid item xs={6}>
                                        <Typography>Price:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="h2" variant="h2">${product.price}</Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid item xs={6}>
                                        <Typography>Sale:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{product.discount} %</Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => addToCartHandler(product)}
                                    >
                                        Add to card
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
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
    const res = await axios('http://ca17-46-251-212-202.ngrok.io/products')
    const posts = await res.data
    const paths = posts.results.map((product) => ({
        params: {id: product.id.toString()},
    }))
    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await axios(`http://ca17-46-251-212-202.ngrok.io/products/${params.id}`)
    const product = await res.data

    return {props: {product}}
}

export default ProductScreen;

