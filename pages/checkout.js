import React, {useState} from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Buttons/Buttons";
import {Grid, Link, List, TextField} from "@material-ui/core";
import {Button, Card, ListItem, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import useStyle from "../Utils/styles";
import NextLink from 'next/link'

const Checkout = () => {
    const {cart} = useSelector(state => state.cart)
    const [payment, setPayment] = useState('')
    const onChangeValue = (event) => {
        setPayment(event.target.value)
        localStorage.setItem('productsSize', payment)
    }
    const classes = useStyle();

    return (
        <Layout>
            <Buttons/>
            <Grid container spacing={1}>
                <Grid item xs={12} md={8}>
                    <List>
                        <Typography component='h1' variant='h1'>
                            <strong>
                                Оформление заказа
                            </strong>
                        </Typography>
                        <Typography component='h2' variant='h2'>
                            Cпособ доставки
                        </Typography>
                        <ListItem>
                            <Grid item xs={12} md={2}>
                                <Button variant='outlined'>Платный</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button variant='outlined'>Бесплатный</Button>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid item xs={12} md={2}>
                                <Button variant='outlined'>Курьером</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <NextLink href='/issuepoint'>
                                    <Link>
                                        <Button variant='outlined'>Пунк выдачи</Button>
                                    </Link>
                                </NextLink>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Typography
                                pl={2}
                                variant="button"
                                textAlign="center"
                                style={{border: '1px solid grey', padding: "7px", borderRadius: 5}}
                            >
                                Курьером
                                <p style={{fontSize: '0.5rem'}}>Только по городу Бишкек</p>
                            </Typography>
                        </ListItem>
                        <List>
                            <Typography component='h1' variant='h2'>
                                Способ оплаты
                            </Typography>
                            <ListItem>
                                <div className='form_radio_btn'>
                                    <label
                                        key="Оплата наличными"
                                    >
                                        💵
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <span style={{fontSize: "12px"}}>
                                          Оплата
                                        наличными
                                        </span>
                                    </label>
                                </div>
                                <div className='form_radio_btn'>
                                    <label
                                        key="Mbank"
                                    >
                                        <img
                                            src='https://play-lh.googleusercontent.com/dsfiyTKElmAxtD0QhvuXdfHGhWsbnDW7vTC_dYdeN9yKTv9xs8_HyHz1O8c9f6uvrQ'
                                            alt="mbank"
                                            width={15}
                                        />
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <span style={{fontSize: '12px'}}>
                                             Mbank
                                        </span>
                                    </label>
                                </div>
                                <div className='form_radio_btn'>
                                    <label
                                        key="О! Деньги"
                                    >
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <img
                                            src="https://cms.timbu.com/storage/photos/O!-1562927890.png"
                                            alt="Кошелек «О! Деньги»"
                                            width={25}
                                        />
                                        <span style={{fontSize: "12px"}}>
                                            «О! Деньги»
                                        </span>
                                    </label>
                                </div>
                                <div className='form_radio_btn'>
                                    <label
                                        key="Balance.kg"
                                    >
                                        <img
                                            src="https://play-lh.googleusercontent.com/xN4NjulPfpO6gChBLWSdqH30mfzikW1mCwxvHx5Qp2TI-59E5p0e3SqU67VaI5whpF0"
                                            alt="Кошелек «Balance.kg»"
                                            width={20}
                                        />
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <span style={{fontSize: '12px'}}>
                                            «Balance.kg»
                                        </span>
                                    </label>
                                </div>
                                <div className='form_radio_btn'>
                                    <label
                                        key="MegaPay"
                                    >
                                        <img
                                            src="https://play-lh.googleusercontent.com/jNzcWphuFaZAOV-M8ufJqpPHwdXpQrMA8jHScmRuLrYKfPT1RWJk10UiTP5F1XtExy2f"
                                            width={20}
                                            alt="MegaPay"
                                        />
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <span style={{fontSize: '12px'}}>
                                             MegaPay
                                        </span>
                                    </label>
                                </div>
                                <div className='form_radio_btn'>
                                    <label
                                        key="Элсом"
                                    >
                                        <img
                                            src="https://elsom.kg/wp-content/uploads/2020/12/logo-Elsom-RGB-72.png"
                                            alt="Элсом"
                                            width={20}
                                        />
                                        <input
                                            type="radio"
                                            onChange={onChangeValue}
                                            name="inputRadios"
                                        />
                                        <span style={{fontSize: '12px'}}>
                                               Элсом
                                        </span>
                                    </label>
                                </div>
                            </ListItem>
                            <Typography variant='h2' component='h2'>
                                Оплата наличными курьеру
                            </Typography>
                            <ListItem>
                                <span>Сдача с: </span>&nbsp;
                                <TextField id="outlined-basic" label="Сдача с" variant="outlined" />
                            </ListItem>
                        </List>
                    </List>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <List>
                            <ListItem>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant='h1'>
                                            Итого:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant='h2'>
                                            {cart?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1)} coм
                                        </Typography>
                                    </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid item xs={12} md={10}>
                                    <Typography>
                                        Товары({cart?.reduce((a, c) => a + c.quantity, 0)}):
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Typography>
                                        5678
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid item xs={12} md={10}>
                                    <Typography>
                                        Скидки:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Typography>
                                        10%
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    // onClick={checkoutHandler}
                                >
                                    Заказать
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Typography style={{fontSize: '12px'}} color={"gray"}>
                                    Согласен с условиями Правил пользования торговой площадкой и правилами возврата
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Checkout;
