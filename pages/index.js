import Layout from "../src/components/Layout";
import {
    Button,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid, IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import Advertising from "../src/components/Advertising/Advertising";
import Shops from "../src/components/Shops/Shops";
import data from '../Utils/data'
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {useDispatch} from "react-redux";
const Home = () => {
    const dispatch = useDispatch()
    const classes = useStyle();
    return (
        <>
            <Layout>
                <Advertising/>
                <Shops/>
                <div className={classes.card}>
                    <Typography component="h1" variant="h1">
                        <strong>Хиты продаж</strong>
                    </Typography>
                    <Grid container spacing={3}>
                        {data.products.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card>
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={product.image}
                                                title={product.title}
                                            />
                                        </CardActionArea>
                                    </NextLink>
                                    <List>
                                        <ListItem>
                                            <Typography>
                                                {product.category}
                                            </Typography>
                                        </ListItem>
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography>
                                                ${product.price}
                                            </Typography>
                                            <Typography className={classes.cardTitleIcon}>
                                                <IconButton edge="end">
                                                    <FavoriteBorderIcon
                                                        onClick={() => dispatch(addToFavorite(product))}
                                                        className={classes.favoriteBorderIconHover}
                                                    />
                                                </IconButton>
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
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
            </Layout>
        </>
    )
}

export default Home;

// export async function getStaticProps() {
//     const res = await fetch('http://oneclickback.herokuapp.com/products')
//     const products = await res.json()
//     return { props: { products } }
// }
