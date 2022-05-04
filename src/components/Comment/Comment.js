import React, {useEffect, useState} from 'react';
import {Button, Grid, List, ListItem, Typography} from "@mui/material";
import {Avatar, Box, CircularProgress, Link, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import useStyle from "../../../Utils/styles";
import Axios from "../../../api/Api";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {grey} from "@material-ui/core/colors";

const Comment = ({item}) => {
    const {userInfo} = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    console.log('item', item)
    console.log(reviews)
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
            enqueueSnackbar('Review submitted successfully', {variant: 'success'});
            fetchReviews();
        } catch (err) {
            setLoading(false);
            enqueueSnackbar("Errorcfgvhuji", {variant: 'error'});
        }
    };

    const fetchReviews = async () => {
        try {
            const {data} = await Axios.get(`/comments?catalog_id=${item.id}`)
            setReviews(data.results);
        } catch (err) {
            enqueueSnackbar("Error Get", {variant: 'error'});
        }
    };

    useEffect(() => {
        fetchReviews()
    }, []);
    console.log(reviews)

    const classes = useStyle();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        JSON.stringify(localStorage.setItem('commentImg', imagePreviewUrl))
    };
    return (
        <div>
            <List>
                <List>
                    <Typography component='h1' variant='h1'>Фотографии пользователей</Typography>
                    <Typography pb={2}>
                        <img
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
                                        </Typography>
                                        <Typography pl={1}>
                                            {review.created_at.substring(0, 10)}
                                        </Typography>
                                    </div>
                                </ListItem>
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <List>
                                    <ListItem className={classes.flex}>
                                        <div>
                                            <Typography>{review.description}</Typography>
                                            <Link>Ответить</Link>
                                        </div>
                                        <div className={classes.flex}>
                                            <Typography pr={4}>
                                                <ThumbUpAltIcon sx={{ color: grey[500] }}/>
                                            </Typography>
                                            <Typography>
                                                <ThumbDownIcon sx={{ color: grey[500] }}/>
                                            </Typography>
                                        </div>
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
                                        variant={'standard'}
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