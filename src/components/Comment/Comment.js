import React, {useEffect, useState} from 'react';
import {
    Avatar,
    CircularProgress,
    IconButton,
    Link,
    TextField,
    Grid,
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import useStyle from "../../../Utils/styles";
import Axios from "../../../api/Api";
import AnswerComment from "./AnswerComment";
import {ActionType} from "../../../Utils/redux/actions/types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import api from "../../../api/globalApi";

const Comment = ({item}) => {
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentsPhoto, setCommentsPhoto] = useState()
    // const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const {enqueueSnackbar} = useSnackbar();
    const [read, setRead] = useState();

    // const handleImageChange = (e) => {
    //     e.preventDefault();
    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     setRead(file);
    //     reader.onloadend = () => {
    //         setImagePreviewUrl(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    // };
    const [file, setFile] = useState("");
    console.log('file',file)
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };


    // const handleImageChange = (e) => {
    //     e.preventDefault();
    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     reader.onloadend = () => {
    //         setImagePreviewUrl(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await Axios.post("/comments",
                {
                    description: comment,
                    product: item.id,
                    photos: [file.lastModified]
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


    const getPhotos = async () => {
        try {
            const {data} = await api.get(`/comments-photo?catalog_id=${item.id}`)
            setCommentsPhoto(data)
        } catch (e) {
            console.log(e)
        }
    }

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
        getPhotos()
        fetchReviews()
    }, []);

    const handlerClickLike = (id) => {
        try {
            Axios.post('/like-comment', {
                user: userInfo.id,
                comment: id,
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
                <div>
                    <Typography
                        component='h1'
                        variant='h1'
                    >
                        Фотографии пользователей
                    </Typography>
                </div>
                {
                    commentsPhoto ? (
                        commentsPhoto.results.map((item) => (
                            <div key={item}>
                                <img src={item.photo} alt=""/>
                            </div>
                        ))
                    ) : (<h2>loading</h2>)
                }
                <div>
                    <Typography name="reviews" id="reviews" variant="h1" component='h1'>
                        Отзывы клиентов
                    </Typography>
                </div>
                <div>
                    {reviews.length === 0 && <ListItem>Нет обзора</ListItem>}
                </div>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <Grid container>
                            <Grid item>
                                <div className={classes.flex}>
                                    <div>
                                        <Avatar>
                                            {review.avatar}
                                        </Avatar>
                                    </div>
                                    &nbsp;
                                    <div>
                                        <Typography>
                                            <strong>{review.user.username}</strong>
                                            <span className={classes.dataYear}>
                                                {review.created_at.substring(0, 10)}
                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className={classes.comDesc}>
                                    <div className={classes.flex}>
                                        <Grid xs={12}>
                                            <div className={classes.flex}>
                                                <div>
                                                    <span>{review.description}</span>
                                                </div>
                                                <div>
                                                    <IconButton
                                                        onClick={() => review.liked ? (
                                                            removeHandlerClick(review.id)
                                                        ) : (
                                                            handlerClickLike(review.id)
                                                        )}>
                                                        <ThumbUpIcon
                                                            style={review.liked ? (
                                                                {color: 'crimson'}
                                                            ) : (
                                                                {color: '#bdbdbd'}
                                                            )}
                                                        />
                                                    </IconButton>
                                                    <span>{review.likes}</span>
                                                </div>
                                            </div>
                                            <div className={classes.childComment}>
                                                {review.children.map(item => (
                                                    <div key={item.id}>
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
                                                    </div>
                                                ))}
                                            </div>
                                            <AnswerComment comment={review} product={item}/>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                ))}
                <div>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className={classes.reviewForm}>
                            <Typography variant="h2" component='h2'>Оставьте свой отзыв</Typography>
                            <div>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    name="review"
                                    label="Введите комментарий"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className={classes.flexCenter}>
                                <div>
                                    <button
                                        className='btn'
                                        type="submit"
                                    >
                                        Отправить
                                    </button>
                                    {loading && <CircularProgress/>}
                                </div>
                                <div>
                                    <ListItem>
                                        <label className="input-file">
                                            <input
                                                type="file"
                                                id="profile_pic"
                                                name="profile_pic"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => handleImageChange(e)}
                                                className="fileInput"
                                            />
                                            Добавить фото
                                        </label>
                                    </ListItem>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <Typography variant="h2">
                            Please{' '}
                            <Link href="/login">
                                login
                            </Link>{' '}
                            написать отзыв
                        </Typography>
                    )}
                </div>
            </List>
        </div>
    );
};

export default Comment;