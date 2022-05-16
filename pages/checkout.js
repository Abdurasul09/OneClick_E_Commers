import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Buttons/Buttons";
import {Grid, List, TextField} from "@material-ui/core";
import {Button, Card, ListItem, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import NextLink from 'next/link'
import useStyle from "../Utils/styles";
import {Controller, useForm} from "react-hook-form";
import Axios from "../api/Api";

const Checkout = () => {
    const {handleSubmit, control, formState: {errors},} = useForm();
    const {cart} = useSelector(state => state.cart)
    const {location} = useSelector(state => state.address)
    const [address, setAddress] = useState({})
    const [cashPaymentActive, setCashPaymentActive] = useState(false)
    const [active, setActive] = useState(false)
    const [formActive, setFormActive] = useState(false)
    const [delivery, setDelivery] = useState('')
    const [phonee, setPhonee] = useState('')
    const [payment, setPayment] = useState('')
    const classes = useStyle();
    console.log(delivery)


    useEffect(() => {
        setAddress(JSON.parse(localStorage.getItem('address')))
    }, [])

    const submitHandler = async ({name, address, phone, entrance, floor, intercom}) => {
        try {
            const sendInfo = {name, address, phone, entrance, floor, intercom}
            Axios.post('/orders', {
                delivery: delivery,
                payment: payment,
                address: location,
                phone: phonee,
                products: [{
                    product: 1,
                    qt: cart.quantity,
                    size: cart.sizes,
                    color: cart.color
                }]
            })
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <Buttons/>
            <Grid container spacing={1}>
                <Grid item xs={12} md={7}>
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
                            <Grid container>
                                <Grid item xs={12} md={2}>
                                    <Typography
                                        variant='h2'
                                        component='h2'
                                    >
                                        Платный
                                    </Typography>
                                    <Typography className={classes.delivery}>
                                        <div className='paid'>
                                            <label key="Курьером">
                                                <input
                                                    onClick={() => formActive ? setFormActive(false) : setFormActive(true)}
                                                    type="radio"
                                                    onChange={(e) => setDelivery(e.target.value)}
                                                    name="inputRadios"
                                                    value='paid'
                                                />
                                                КУРЬЕРОМ
                                            </label>
                                        </div>
                                    </Typography>

                                </Grid>
                                <Grid item cs={12} md={1} className={classes.reviewItem}/>
                                <Grid item xs={12} md={5}>
                                    <Typography variant='h2' component='h2'>Бесплатный</Typography>
                                    <NextLink href='/issuepoint'>
                                        <a style={{textDecoration: 'none'}}>
                                            <Button variant='outlined'>Пунк выдачи</Button>
                                        </a>
                                    </NextLink>
                                    <Typography
                                        pl={2}
                                        textAlign="center"
                                        width={120}
                                        className={classes.delivery}
                                    >
                                        <div className='free'>
                                            <label key="Курьером Только по городу Бишкек">
                                                <input
                                                    onClick={() => formActive ? setFormActive(false) : setFormActive(true)}
                                                    type="radio"
                                                    onChange={(e) => setDelivery(e.target.value)}
                                                    name="inputRadios"
                                                    value='free'
                                                />
                                                КУРЬЕРОМ
                                                <p style={{fontSize: '0.4rem'}}>Только по городу Бишкек</p>
                                            </label>
                                        </div>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {location ? (
                            <List className={formActive ? "block" : 'none'}>
                                <ListItem>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <Typography variant='h1' component='h1'>Мои адреса</Typography>
                                        <ListItem>
                                            <Typography pr={3}>Ф.И.О</Typography>
                                            <Controller
                                                name="name"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="name"
                                                        inputProps={{type: "name"}}
                                                        error={Boolean(errors.name)}
                                                        helperText={
                                                            errors.name
                                                                ? errors.name.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Typography pr={3}>Телефон</Typography>
                                            <Controller
                                                name="phone"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="phone"
                                                        inputProps={{type: "phone"}}
                                                        error={Boolean(errors.phone)}
                                                        helperText={
                                                            errors.phone
                                                                ? errors.phone.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Typography pr={3}>Адрес</Typography>
                                            <Controller
                                                name="address"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="address"
                                                        inputProps={{type: "address"}}
                                                        error={Boolean(errors.address)}
                                                        helperText={
                                                            errors.address
                                                                ? errors.address.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="entrance"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        label='Подьезд'
                                                        id="entrance"
                                                        inputProps={{type: "entrance"}}
                                                        error={Boolean(errors.entrance)}
                                                        helperText={
                                                            errors.entrance
                                                                ? errors.entrance.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                            <Controller
                                                name="floor"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        style={{margin: 5}}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="floor"
                                                        label='Этаж'
                                                        inputProps={{type: "floor"}}
                                                        error={Boolean(errors.floor)}
                                                        helperText={
                                                            errors.floor
                                                                ? errors.floor.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                            <Controller
                                                name="intercom"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({field}) =>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        label='Домофон'
                                                        id="intercom"
                                                        inputProps={{type: "intercom"}}
                                                        error={Boolean(errors.intercom)}
                                                        helperText={
                                                            errors.intercom
                                                                ? errors.intercom.type === 'minLength'
                                                                    ? 'zapolnite pole'
                                                                    : 'FIO is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                fullWidth
                                                color="primary"
                                            >
                                                Сохранить
                                            </Button>&nbsp;
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                type="submit"
                                                color="primary"
                                            >
                                                Отмена
                                            </Button>
                                        </ListItem>
                                    </form>
                                </ListItem>
                            </List>
                        ) : (<h1>net</h1>)}
                        {location ? (
                            <List>
                                <Typography variant='h1' component='h1'>Мои адреса</Typography>
                                <p className={classes.address}>
                                    {address.name}
                                </p>
                            </List>
                        ) : (<h2>Выберите адрес!</h2>)}
                        <List>
                            <Typography component='h1' variant='h2'>
                                Способ оплаты
                            </Typography>
                            <ListItem>
                                <div
                                    className='payWithCart'
                                    onClick={() => cashPaymentActive ? setCashPaymentActive(false) : setCashPaymentActive(true)}
                                >
                                    <label
                                        key="Оплата наличными"
                                    >
                                        💵
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'Оплата наличными'}
                                        />
                                        <span style={{fontSize: "12px"}}>
                                          Оплата
                                        наличными
                                        </span>
                                    </label>
                                </div>
                                <div
                                    className='payWithCart'
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <label
                                        key="Mbank"
                                    >
                                        <img
                                            src='https://play-lh.googleusercontent.com/dsfiyTKElmAxtD0QhvuXdfHGhWsbnDW7vTC_dYdeN9yKTv9xs8_HyHz1O8c9f6uvrQ'
                                            alt="mbank"
                                            width={12}
                                        />
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'mbank'}

                                        />
                                        <span style={{fontSize: '12px'}}>
                                             Mbank
                                        </span>
                                    </label>
                                </div>
                                <div
                                    className='payWithCart'
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <label
                                        key="О! Деньги"
                                    >
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'О! Деньги'}

                                        />
                                        <img
                                            src="https://cms.timbu.com/storage/photos/O!-1562927890.png"
                                            alt="Кошелек «О! Деньги»"
                                            width={15}
                                        />
                                        <span style={{fontSize: "12px"}}>
                                            «О! Деньги»
                                        </span>
                                    </label>
                                </div>
                                <div
                                    className='payWithCart'
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <label
                                        key="Balance.kg"
                                    >
                                        <img
                                            src="https://play-lh.googleusercontent.com/xN4NjulPfpO6gChBLWSdqH30mfzikW1mCwxvHx5Qp2TI-59E5p0e3SqU67VaI5whpF0"
                                            alt="Кошелек «Balance.kg»"
                                            width={15}
                                        />
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'Кошелек «Balance.kg»'}

                                        />
                                        <span style={{fontSize: '12px'}}>
                                            «Balance.kg»
                                        </span>
                                    </label>
                                </div>
                                <div
                                    className='payWithCart'
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <label
                                        key="MegaPay"
                                    >
                                        <img
                                            src="https://play-lh.googleusercontent.com/jNzcWphuFaZAOV-M8ufJqpPHwdXpQrMA8jHScmRuLrYKfPT1RWJk10UiTP5F1XtExy2f"
                                            width={15}
                                            alt="MegaPay"
                                        />
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'MegaPay'}

                                        />
                                        <span style={{fontSize: '12px'}}>
                                             MegaPay
                                        </span>
                                    </label>
                                </div>
                                <div
                                    className='payWithCart'
                                    onClick={() => active ? setActive(false) : setActive(true)}
                                >
                                    <label
                                        key="Элсом"
                                    >
                                        <img
                                            src="https://elsom.kg/wp-content/uploads/2020/12/logo-Elsom-RGB-72.png"
                                            alt="Элсом"
                                            width={15}
                                        />
                                        <input
                                            type="radio"
                                            onChange={(e) => setPayment(e.target.value)}
                                            name="inputRadios"
                                            value={'Элсом'}

                                        />
                                        <span style={{fontSize: '12px'}}>
                                               Элсом
                                        </span>
                                    </label>
                                </div>
                            </ListItem>
                            <List className={cashPaymentActive ? "block" : 'none'}>
                                <Typography variant='h2' component='h2'>
                                    Оплата наличными курьеру
                                </Typography>
                                <ListItem>
                                    <span>Сдача с: </span>&nbsp;
                                    <TextField id="outlined-basic" label="Сдача с" variant="outlined"/>
                                </ListItem>
                            </List>
                            <List className={active ? "block" : 'none'}>
                                <ListItem>
                                    <Typography variant='h2' component='h2'>
                                        MBank Online от Банка КЫРГЫЗСТАН
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Grid container className={classes.flexCenter}>
                                        <Grid item xs={12} md={1} style={{paddingLeft: 10}}>
                                            <span className={classes.exclamatory}>!</span>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <span className={classes.payCartTitle}>
                                       «Бесплатная доставка» действует при оплате свыше 990 сом.
                                        Оплата за доставку при заказе менее 990 сом согласно тарифной
                                        политике Namba Food.
                                    </span>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12} md={3}>
                                            <span style={{fontSize: 14}}>
                                                Введите ваш номер
                                                телефона:
                                            </span>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <TextField
                                                variant="outlined"
                                                type='phone'
                                                placeholder='+996 xxx xxx xxx'
                                                onChange={(e) => setPhonee(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12} md={9}>
                                            <span style={{fontSize: '.7rem'}}>
                                               Вам будет отправлен запрос на оплату услуг Nambafood.
                                               Если номер вашего MBank Online отличается от текущего, то измените его.
                                            </span><br/>
                                            <span style={{fontSize: '.7rem'}}> При оплате этим способом - БЕСПЛАТНАЯ ДОСТАВКА</span>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </List>
                    </List>
                </Grid>
                <Grid xs={12} md={2}/>
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
