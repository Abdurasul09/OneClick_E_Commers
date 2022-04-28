import React, {useEffect} from 'react';
import dynamic from "next/dynamic";
import Layout from "../src/components/Layout";
import {
    Button, Card,
    Grid, Link, ListItem,
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
import {List} from "@material-ui/core";
import {useRouter} from "next/router";
import {IncToCart, DecFromCart, DeleteFromCart, getCart, addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import {urlImag} from "../api/globalApi";



const CartScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);
    console.log('dfghvbjkn', cart)
    const classes = useStyle();
    useEffect(() => {
        dispatch(getCart(JSON.parse(localStorage.getItem('cart'))))
    }, [])
    const checkoutHandler = () => {
        router.push("/shipping")
    }

    return (
        <div className={classes.cartScreen}>
            <Layout title="Shopping cart">
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
                <Typography component="h1" variant="h1">Shopping Cart</Typography>
                {cart?.length === 0 ? (
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        Cart is empty &nbsp;
                        <NextLink href="/"><Link>Go Shopping</Link></NextLink>
                    </Typography>
                ) : (
                    <Grid container spacing={1}>
                        <Grid item md={8} xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart?.map((el, idx) => (
                                            <TableRow key={el.id}>
                                                <TableCell>
                                                    <NextLink href={`/product/${el.id}`} passHref>
                                                        <img
                                                            src={`${urlImag + el.image}`}
                                                            alt={el.title}
                                                            width={100}
                                                            height={120}
                                                            style={{objectFit: "contain"}}
                                                        />
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink href={`/product/${el.id}`} passHref>
                                                        <Typography>{el.category}</Typography>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    className={classes.cartQuantity}
                                                >
                                                    <IconButton
                                                        color="error"
                                                        aria-label="add an alarm"
                                                        onClick={() => dispatch(DecFromCart(el.id))}
                                                    >
                                                        <RemoveIcon color={"error"}/>
                                                    </IconButton>
                                                    <span className={classes.cartQuantity}>{el.quantity}</span>
                                                    <IconButton
                                                        color="error"
                                                        aria-label="add an alarm"
                                                        onClick={() => dispatch(addToCartHandler(el))}
                                                    >
                                                        <AddIcon color={"error"}/>
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
                            <Card>
                                <List>
                                    <ListItem>
                                        <Typography variant="h2">
                                            Subtitle ({cart?.reduce((a, c) => a + c.quantity, 0)} {''}
                                            items) : $ {''}
                                            {cart?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={checkoutHandler}
                                        >
                                            Check Out
                                        </Button>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Layout>
        </div>

    );
};

export default dynamic(() => Promise.resolve(CartScreen), {ssr: false});