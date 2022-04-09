import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Utils/redux/Store';
import Layout from '../src/components/Layout';
import CheckoutWizard from '../src/components/ChekoutWizard/ChekoutWizard';
import useStyle from '../Utils/styles';
import {
    Button,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {ActionType} from "../Utils/redux/actions/types";
import NextLink from "next/link";

export default function Payment() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyle();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const {
        shippingAddress
    } = state;
    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/payment');
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '');
        }
    }, []);
    const submitHandler = (e) => {
        closeSnackbar();
        e.preventDefault();
        if (!paymentMethod) {
            enqueueSnackbar('Payment method is required', { variant: 'error' });
        } else {
            dispatch({ type: ActionType.SAVE_PAYMENT_METHOD, payload: paymentMethod });
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeorder');
        }
    };
    return (
        <Layout title="Payment Method">
            <div className={classes.loginBtn}>
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
            <CheckoutWizard activeStep={2}/>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component="h4" variant="h4">
                    Payment Method
                </Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Payment Method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    label="PayPal"
                                    value="PayPal"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    label="Stripe"
                                    value="Stripe"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    label="Cash"
                                    value="Cash"
                                    control={<Radio />}
                               />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            onClick={() => router.push('/shipping')}
                        >
                            Back
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}