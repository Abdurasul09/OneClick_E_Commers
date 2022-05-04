import Layout from "../src/components/Layout";
import {
    Button,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import Advertising from "../src/components/Advertising/Advertising";
import {Recommend} from "../src/components/Recommend/Recommend";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import api from "../api/globalApi";
import {useSoftRiseShadowStyles} from '@mui-treasury/styles/shadow/softRise';
import {Link} from "@material-ui/core";
import Newcollection from "./newcollection";
import {grey} from "@material-ui/core/colors";


const Home = ({products}) => {
    const [allProducts, setAllProducts] = useState(products)
    const dispatch = useDispatch()
    const {posts} = useSelector(state => state.posts)
    const classes = useStyle();
    const shadowStyles = useSoftRiseShadowStyles();
    useEffect(() => {
        if (posts[0]) {
            setAllProducts(posts)
        }
    }, [posts])

    return (
        <>
            <Layout>
                <Advertising/>
                <Recommend/>
                <div className={classes.card}>
                    <NextLink href="#" passHref>
                        <Link>
                            <Typography
                                py={2}
                                className={classes.brand}
                            >
                                Хиты продаж
                            </Typography>
                        </Link>
                    </NextLink>
                    <Grid container spacing={5}>
                        {allProducts.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card>
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                className={classes.productImage}
                                                image={product.image}
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
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography sx={{ color: grey[600] }}>
                                                {product.title}
                                            </Typography>
                                            <FavoriteBorderIcon
                                                onClick={() => dispatch(addToFavorite(product))}
                                                className={classes.favoriteBorderIconHover}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            {product.discount_price ? (
                                                <div className={classes.flex}>
                                                    <Typography>
                                                        <strong>{product.discount_price} coм</strong>
                                                    </Typography>
                                                    <Typography pl={2}>
                                                        <del style={{color: "grey", fontSize: '13px'}}>
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
                                        </ListItem>
                                    </List>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color={'primary'}
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
                <Newcollection/>
            </Layout>
        </>
    )
}

export default Home;
export async function getServerSideProps() {
    const res = await api(`/products`)
    const products = await res.data.results
    return {props: {products}}
}