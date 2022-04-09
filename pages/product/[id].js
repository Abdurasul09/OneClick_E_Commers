import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import {Button, Card, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../../Utils/styles";
import {Store} from "../../Utils/redux/Store";
import {ActionType} from "../../Utils/redux/actions/types";
import data from '../../Utils/data'
import axios from "axios";
import {useSnackbar} from "notistack";
import {CircularProgress, Link, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

const ProductScreen = () => {
    const router = useRouter()
    const {id} = router.query
    const classes = useStyle();
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.user)
    const {enqueueSnackbar} = useSnackbar();
    const addToCartHandler = (data) => {
        dispatch({type: ActionType.ADD_TO_CARD, payload: data})
    }
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("https://oneclickback.herokuapp.com/comments", {
                id: 1,
                parent: 1,
                description: comment,
                user: 2,
                product: 1
            },)
            setLoading(false);
            enqueueSnackbar('Review submitted successfully', {variant: 'success'});
            fetchReviews();
        } catch (err) {
            setLoading(false);
            enqueueSnackbar("Error", {variant: 'error'});
        }
    };

    const fetchReviews = async () => {
        try {
            const {data} = await axios.get("https://oneclickback.herokuapp.com/comments")
            setReviews(data);
            console.log(data)
        } catch (err) {
            enqueueSnackbar("Error", {variant: 'error'});
        }
    };
    useEffect(() => {
        fetchReviews()
    }, []);


    return (
        <Layout title={data.title} description={data.description}>
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
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <img
                            src={data.image}
                            alt={data.title}
                            width={400}
                            height={540}
                            layout="responsive"
                            style={{objectFit: "cover"}}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">Name: Shirts</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Цена: $ {data.price}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Brand: Adidas</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Title: {data.title}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Rating: Better</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Size: 46, 48, 50, 52</Typography>
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
                                        <Typography component="h2" variant="h2">${data.price}</Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid item xs={6}>
                                        <Typography>Sale:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>$ -50</Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => addToCartHandler(data)}
                                    >
                                        Add to card
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <List>
                <ListItem>
                    <Typography name="reviews" id="reviews" variant="h2">
                        Customer Reviews
                    </Typography>
                </ListItem>
                {reviews.length === 0 && <ListItem>No review</ListItem>}
                {reviews.map((review) => (
                    <ListItem key={review.id}>
                        <Grid container>
                            <Grid item className={classes.reviewItem}>
                                <Typography>
                                    <strong>{review.name}</strong>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{review.description}</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <ListItem>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className={classes.reviewForm}>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">Leave your review</Typography>
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        name="review"
                                        label="Enter comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                    {loading && <CircularProgress/>}
                                </ListItem>
                            </List>
                        </form>
                    ) : (
                        <Typography variant="h2">
                            Please{' '}
                            <Link href="/login">
                                login
                            </Link>{' '}
                            to write a review
                        </Typography>
                    )}
                </ListItem>
            </List>

        </Layout>
    );
};


// export async function getStaticPaths() {
//     const res = await axios('https://fakestoreapi.com/products')
//     const posts = await res.data
//     const paths = posts.map((product) => ({
//         params: {id: product.id.toString()},
//     }))
//     return {paths, fallback: false}
// }
//
// export async function getStaticProps({params}) {
//     const res = await axios(`https://fakestoreapi.com/products/${params.id}`)
//     const product = await res.data
//
//     return {props: {product}}
// }

export default ProductScreen;