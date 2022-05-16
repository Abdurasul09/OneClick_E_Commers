import React, {useEffect} from 'react';
import Layout from "../src/components/Layout";
import {
    Grid, Link,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import Table from "@mui/material/Table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {SnackbarContent} from "@material-ui/core";
import {DecFromCart, DeleteFromCart, getCart, addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import SubTotal from "../src/components/Cart/SubTotal";
import Buttons from "../src/components/Buttons/Buttons";


const CartScreen = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);
    console.log(cart)
    const classes = useStyle();

    useEffect(() => {
        dispatch(getCart(JSON.parse(localStorage.getItem('cart'))))
    }, [])

    return (
        <div className={classes.cartScreen}>
            <Layout title="Shopping cart">
                <Buttons/>
                <Typography component="h1" variant="h1">Корзина</Typography>
                {cart?.length === 0 ? (
                    <>
                        <SnackbarContent
                            variant={'outlined'}
                            message="Корзина пуста!"
                        />
                        <NextLink href="/"><Link>Ходить по магазинам</Link></NextLink>
                    </>
                ) : (
                    <Grid container spacing={1}>
                        <Grid item md={8} xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Изображение</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart?.map(el => (
                                            <TableRow key={el.id}>
                                                <TableCell>
                                                    {el.images.map(item => (
                                                        <div key={item.id}>
                                                            <NextLink
                                                                href={`/product/${el.id}`}
                                                                passHref
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt='Хлопковая футболка-поло с короткими рукавами для мальчика'
                                                                    width={100}
                                                                    height={120}
                                                                    style={{objectFit: "contain"}}
                                                                />
                                                            </NextLink>
                                                        </div>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink href={`/product/${el.id}`} passHref>
                                                        <Typography>
                                                            {el.title}
                                                        </Typography>
                                                    </NextLink>
                                                    <Typography fontSize={'small'}>
                                                        <span>Размер:</span>&nbsp;{el.sizes}
                                                    </Typography>
                                                    <Typography fontSize={'small'}>
                                                        <span>Цвет:</span>&nbsp;{el.color}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    className={classes.cartQuantity}
                                                >
                                                    <IconButton
                                                        aria-label="add an alarm"
                                                        onClick={() => dispatch(DecFromCart(el.id))}
                                                    >
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                    <span className={classes.cartQuantity}>{el.quantity}</span>
                                                    <IconButton
                                                        aria-label="add an alarm"
                                                        onClick={() => dispatch(addToCartHandler(el))}
                                                    >
                                                        <AddIcon/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="right">
                                                    $ {el.price}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <DeleteOutlineIcon
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => (dispatch(DeleteFromCart(el)))}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item md={1} xs={12}/>
                        <Grid item md={3} xs={12}>
                            <SubTotal cart={cart}/>
                        </Grid>
                    </Grid>
                )}
            </Layout>
        </div>

    );
};

// export default dynamic(() => Promise.resolve(CartScreen), {ssr: false});
export default CartScreen;
