import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {Grid, Link, List, ListItem} from "@material-ui/core";
import useStyle from "../../../Utils/styles";
import NextLink from "next/link";
import api from "../../../api/globalApi";
import {useEffect, useState} from "react";
import {grey} from "@material-ui/core/colors";
import Modal from "../Ocno";
import SingleProduct from "../SingleProduct/SingleProduct";
import {addToFavorite} from "../../../Utils/redux/actions/FavoriteAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useDispatch} from "react-redux";

export const New = () => {
    const [productsItem, setProductsItem] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [singleProduct, setSingleProduct] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        productsItem.results?.map(item => (
            item.products.slice(0, 1).map((item) => {
                setSingleProduct(item)
            })
        ))
    }, [productsItem])

    useEffect(() => {
        try {
            api('/collections')
                .then(res => setProductsItem(res.data))
        } catch (e) {
            console.log(e)
        }
    }, [])
    const classes = useStyle();
    return (
        <div>
            <NextLink href="/" passHref>
                <a>
                    {productsItem.results?.map(el => (
                        <Typography
                            key={el.id}
                            py={2}
                            className={classes.globalText}
                        >
                            {/*{el.name}*/}
                            Новинки . . .
                        </Typography>
                    ))}
                </a>
            </NextLink>
            <Grid container spacing={5}>
                {productsItem.results?.map(productItem => (
                    <>
                        {productItem.products.map(product => (
                            <Grid item md={3} key={product.id}>
                                <Card>
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea className='productImage'>
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
                                            <span className='willLook'>
                                                Посмотреть
                                            </span>
                                        </CardActionArea>
                                    </NextLink>
                                    <List
                                        onClick={() => setSingleProduct(product)}
                                        style={{paddingBottom: 0}}
                                    >
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography
                                                onClick={() => setModalActive(true)}
                                                sx={{color: grey[600]}}
                                            >
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
                                </Card>
                            </Grid>
                        ))}
                    </>
                ))}
            </Grid>
            <Modal active={modalActive} setActive={setModalActive}>
                <SingleProduct singleProduct={singleProduct}/>
            </Modal>
        </div>
    );
}

