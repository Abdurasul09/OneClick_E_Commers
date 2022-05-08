import React, {useEffect, useState} from 'react';
import {Button, Grid, List, ListItem, Typography} from "@mui/material";
import {Avatar, CircularProgress, IconButton, Link, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import useStyle from "../../../Utils/styles";
import Axios from "../../../api/Api";
import AnswerComment from "./AnswerComment";
import {ActionType} from "../../../Utils/redux/actions/types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Comment = ({item}) => {
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idComment, setIdComment] = useState([])
    const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        setIdComment(reviews.map(el => el.id))
    }, [item])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Axios.post("/comments",
                {
                    description: comment,
                    product: item.id,
                })
            setLoading(false);
            enqueueSnackbar('Отзыв успешно отправлен!', {variant: 'success'});
            fetchReviews();
            setComment('')
        } catch (err) {
            setLoading(false);
            enqueueSnackbar("Error", {variant: 'error'});
        }
    };

    const fetchReviews = async () => {
        try {
            const {data} = await Axios.get(`/comments?catalog_id=${item.id}`)
            setReviews(data.results);
            dispatch({type: ActionType.DELETE_COMMENT, payload: data.results})
        } catch (err) {
            enqueueSnackbar("Error Get", {variant: 'error'});
        }
    };

    useEffect(() => {
        fetchReviews()
    }, []);

    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handlerClickLike = (id) => {
        console.log(id)
        try {
            Axios.post('/like-comment', {
                user: userInfo.id,
                comment: id
            })
            fetchReviews()
        } catch (e) {
            console.log(e)
        }
    }

    const removeHandlerClick = (id) => {
        try {
            Axios.delete(`/like-comment/${id}`)
            fetchReviews()
        } catch (e) {
            console.log(e)
        }
    }

    const classes = useStyle();
    return (
        <div>
            <List>
                <List>
                    <Typography component='h1' variant='h1'>Фотографии пользователей</Typography>
                    <Typography pb={2}>
                        <img
                            alt="comment image"
                            style={{objectFit: 'cover'}}
                            src={imagePreviewUrl}
                            width={150}
                            height={150}
                        />
                    </Typography>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                    />
                </List>
                <ListItem>
                    <Typography name="reviews" id="reviews" variant="h1" component='h1'>
                        Отзывы клиентов
                    </Typography>
                </ListItem>
                {reviews.length === 0 && <ListItem>No review</ListItem>}
                {reviews.map((review) => (
                    <ListItem key={review.id}>
                        <Grid container>
                            <Grid item className={classes.reviewItem}>
                                <ListItem>
                                    <div>
                                        <Avatar>
                                            {review.avatar}
                                        </Avatar>
                                    </div>
                                    <div>
                                        <Typography pl={1}>
                                            <strong>{review.user.username}</strong>
                                            <span className={classes.dataYear}>
                                                {review.created_at.substring(0, 10)}
                                            </span>
                                        </Typography>
                                    </div>
                                </ListItem>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <List style={{padding: "0 0 0 4rem" }}>
                                    <ListItem className={classes.flex} style={{padding: 0}}>
                                        <Grid xs={12}>
                                            <ListItem style={{padding: 0}}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={11}
                                                    style={{padding: 0}}
                                                >
                                                    <Typography>{review.description}</Typography>
                                                </Grid>
                                                <Grid item xs={12} md={1}>
                                                    <IconButton
                                                        onClick={() => review.liked ? (
                                                            removeHandlerClick(review.id)
                                                        ) : (
                                                            handlerClickLike(review.id)
                                                        )}>
                                                        <ThumbUpIcon
                                                            style={review.liked ? (
                                                                {color: '#021b79'}
                                                            ) : (
                                                                {color: '#bdbdbd'}
                                                            )}
                                                        />
                                                    </IconButton>
                                                    <span>{review.likes}</span>
                                                </Grid>
                                            </ListItem>

                                            <div className={classes.childComment}>
                                                {review.children.map(item => (
                                                    <List key={item.id}>
                                                        {item ? (
                                                            <Typography pb={1}>
                                                                <strong>{item.user.username}</strong>
                                                                <span className={classes.dataYear}>
                                                                    {item.created_at.substring(0, 10)}
                                                                </span>
                                                            </Typography>
                                                        ) : ('')}
                                                        <Typography pl={1}>
                                                            {item.description}
                                                        </Typography>
                                                    </List>
                                                ))}
                                            </div>
                                            <AnswerComment comment={review} product={item}/>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <ListItem>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className={classes.reviewForm}>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">Оставьте свой отзыв</Typography>
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        multiline
                                        variant='standard'
                                        name="review"
                                        label="Введите комментарий"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color='secondary'
                                        size="small"
                                    >
                                        Отправить
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
        </div>
    );
};

export default Comment;