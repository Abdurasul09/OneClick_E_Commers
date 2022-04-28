import React, {useContext, useEffect} from 'react';
import {Store} from "../Utils/redux/Store";
import dynamic from "next/dynamic";
import Layout from "../src/components/Layout";
import {
    Button, Card,
    Grid, ListItem,
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

import {List} from "@material-ui/core";
import {useRouter} from "next/router";
import CheckoutWizard from "../src/components/ChekoutWizard/ChekoutWizard";
import {useSelector} from "react-redux";


const PlaceOrder = () => {
    const router = useRouter();
    const { state } = useSelector(state => state);
    // const {cart} = useSelector(state => state.cart);
    const {
        cart,
        shippingAddress,
        paymentMethod
    } = state;
    const classes = useStyle();
    const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemPrice = round2(cart.reduce((a, c) => a + c.price * c.quantity, 0));
    const shippingPrice = itemPrice > 200 ? 0 : 15;
    const totalPrice = round2(itemPrice + shippingPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment')
        }
    }, []);

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
                <CheckoutWizard activeStep={3}/>
                <Typography component="h1" variant="h1">Place order</Typography>
                <Grid container spacing={1}>
                    <Grid item md={8} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Shipping Address
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {shippingAddress.map(el => (
                                        <>
                                            <Typography className={classes.btn}>{el.fullName}</Typography>
                                            <Typography className={classes.btn}>{el.address}</Typography>
                                            <Typography className={classes.btn}>{el.city}</Typography>
                                            <Typography className={classes.btn}>{el.postalCode}</Typography>
                                            <Typography className={classes.btn}>{el.counter}</Typography>
                                        </>
                                    ))}
                                </ListItem>
                            </List>
                        </Card>
                        <Card className={classes.placeOrder}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Payment Method
                                    </Typography>
                                </ListItem>
                                <ListItem>{paymentMethod}</ListItem>
                            </List>
                        </Card>
                        <Card className={classes.placeOrder}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Order Item
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="center">Quantity</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cart.map((el) => (
                                                    <TableRow key={el.id}>
                                                        <TableCell>
                                                            <NextLink href={`/product/${el.id}`} passHref>
                                                                <img
                                                                    src={el.image}
                                                                    alt={el.title}
                                                                    width={100}
                                                                    height={120}
                                                                    style={{objectFit: "contain"}}
                                                                />
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell>
                                                            <NextLink href={`/product/${el.id}`} passHref>
                                                                <Typography component="h2"
                                                                            variant="h2">{el.category}</Typography>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Typography>{el.quantity}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>$ {el.price}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>

                    <Grid item md={1} xs={12}/>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Order Sammery
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={6}>
                                            <Typography>Items:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                ${itemPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={6}>
                                            <Typography>Shipping:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                ${shippingPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid xs={6}>
                                            <Typography><strong>Total:</strong></Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <strong> ${totalPrice}</strong>
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                    >
                                        Place order
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        </div>

    );
};

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false});