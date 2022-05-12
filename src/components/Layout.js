import React, {useEffect, useState} from 'react';
import Contact from "./Footer/Contact";
import {AppBar, Badge, Button, Container, Link, ThemeProvider, Switch, Toolbar, CssBaseline} from '@material-ui/core';
import Head from 'next/head'
import NextLink from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useStyle from "../../Utils/styles";
import {createTheme, Menu, MenuItem,} from "@material-ui/core";
import {ActionType} from "../../Utils/redux/actions/types";
import {useRouter} from "next/router";
import Search from "./Header/Search";
import Burger from "./Header/Burger";
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from "react-redux";
import Categories from "./Categories";
import {Basket} from "../../Utils/svg";
import api from "../../api/globalApi";


const Layout = ({title, children, description}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {darkMode} = useSelector(state => state.mode)
    const {cart} = useSelector(state => state.cart)
    const {favorite} = useSelector(state => state.favorite)
    const [anchorEl, setAnchorEl] = useState(null)
    const [user, setUser] = useState('')


    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#009688',
            },
            secondary: {
                main: '#021b79',
            },
        },
    });

    useEffect(() => {
        const mode = JSON.parse(localStorage.getItem("mode"));
        dispatch({type: !mode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
    },[])


    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
        const newDarkMode = !darkMode;
        localStorage.setItem("mode", newDarkMode);
    };

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const loginMenuCloseHandler = () => {
        setAnchorEl(null);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({type: ActionType.USER_LOGOUT});
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        router.push('/');
    };
    const classes = useStyle();
    const [menuActive, setMenuActive] = useState(false)
    const getUser = async () => {
        try {
            const parse = JSON.parse(localStorage.getItem("access"));
            const res = await api.get("user/", {
                headers: {authorization: `Bearer ${parse}`}
            })
            setUser(res.data)
            dispatch({type: ActionType.USER_INFO, payload: res.data})
        } catch (e) {
            setUser('')
        }
    }
    useEffect(() => {
         getUser()
    }, [anchorEl])



    return (
        <div>
            <Head>
                <title>{title ? `${title} -Интернет магазин || One click` : "Интернет магазин || One click"}</title>
                {description && <meta name="description" content={description}/>}
                <link rel="icon" href="/images/logo.svg"/>
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classes.navbar}
                >
                    <Toolbar>
                        <Burger active={menuActive} setActive={setMenuActive}/>
                        {/*<Rasul/>*/}

                        <div className={classes.grow}/>
                        <Search/>
                        <div className={classes.grow}/>
                        <div className={classes.cardTitleIcon}>
                            <Switch
                                color="success"
                                size="medium"
                                checked={darkMode}
                                onChange={darkModeChangeHandler}
                            />
                            <NextLink href="/favorite" passHref>
                                <Link>
                                    {favorite.length > 0 ? (
                                        <Badge
                                            color={"secondary"}
                                            badgeContent={favorite.length}
                                        >
                                            <IconButton size="small" aria-label="add an alarm"
                                                        className={classes.badge}>
                                                <FavoriteBorderIcon/>
                                            </IconButton>
                                        </Badge>
                                    ) : (
                                        <IconButton size="small" className={classes.iconSvg}>
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    )}
                                </Link>
                            </NextLink>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart?.length > 0 ? (
                                        <Badge
                                            color="secondary"
                                            badgeContent={cart?.length}
                                        >
                                            <IconButton size="small" className={classes.iconSvg}>
                                                <Basket/>
                                            </IconButton>
                                        </Badge>
                                    ) : (
                                        <IconButton size="small" className={classes.iconSvg}>
                                            <Basket/>
                                        </IconButton>
                                    )}
                                </Link>
                            </NextLink>
                            {user ? (
                                <>
                                    <Button
                                        className={classes.navbarBtn}
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={loginClickHandler}
                                    >
                                        {user.username}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={loginMenuCloseHandler}
                                    >
                                        <MenuItem
                                            onClick={loginMenuCloseHandler}
                                        >
                                            <NextLink href="/profile">
                                                <a>Profile</a>
                                            </NextLink>
                                        </MenuItem>
                                        <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>
                                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NextLink href="/login" passHref>
                                    <Link>
                                        <PersonOutlineOutlinedIcon style={{fontSize: "x-large"}}/>
                                    </Link>
                                </NextLink>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                <Container>
                    {children}
                </Container>
                <Contact/>
                <Categories active={menuActive} setActive={setMenuActive}/>
            </ThemeProvider>
        </div>
    );
};

export default Layout;
