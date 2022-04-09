import React, {useEffect, useState} from 'react';
import Contact from "./Footer/Contact";
import {AppBar, Badge, Button, Container, Link, ThemeProvider, Switch, Toolbar, CssBaseline} from '@material-ui/core';
import Head from 'next/head'
import NextLink from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useStyle from "../../Utils/styles";
import {createTheme, Menu, MenuItem,} from "@material-ui/core";
import {ActionType} from "../../Utils/redux/actions/types";
import {useRouter} from "next/router";
import Search from "./Header/Search";
import Burger from "./Header/Burger";
import IconButton from '@mui/material/IconButton';
import SubMenuTheme from "./Menu";
import {useDispatch, useSelector} from "react-redux";
import Demo from "./Shops/rasul";

const Layout = ({title, children, description}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.mode)
    const {  cart } = useSelector(state => state.cart)
    const { favorite } = useSelector(state => state.favorite)
    const {userInfo} = useSelector(state => state.user)

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
                main: '#1384E2',
            },
            secondary: {
                main: '#208080',
            },
        },
    });

    useEffect(() => {
        const mode = JSON.parse(localStorage.getItem("mode"));
        dispatch({type: !mode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
    }, [])

    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
        const newDarkMode = !darkMode;
        localStorage.setItem("mode", newDarkMode);
    };

    const [anchorEl, setAnchorEl] = useState(null)
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const loginMenuCloseHandler = () => {
        setAnchorEl(null);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({type: ActionType.USER_LOGOUT});
        router.push('/')
    }
    const classes = useStyle();
    const [menuActive, setMenuActive] = useState(false)

    return (
        <div>
            <Head>
                <title>{title ? `${title} -Интернет магазин || One click` : "Интернет магазин || One click"}</title>
                {description && <meta name="description" content={description}/>}
                <link rel="icon" href="/images/logo.svg"/>
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    color={"primary"}
                    position="fixed"
                    className={classes.navbar}
                >
                    <Toolbar>
                        <Burger active={menuActive} setActive={setMenuActive}/>
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
                                            <IconButton  size="medium" aria-label="add an alarm" className={classes.badge}>
                                                <FavoriteBorderIcon/>
                                            </IconButton>
                                        </Badge>
                                    ) : (
                                        <IconButton size="medium" className={classes.iconSvg}>
                                            <FavoriteBorderIcon fontSize={"medium"}/>
                                        </IconButton>
                                    )}
                                </Link>
                            </NextLink>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart.length > 0 ? (
                                        <Badge
                                            color="secondary"
                                            badgeContent={cart.length}
                                        >
                                            <IconButton size="medium" className={classes.iconSvg}>
                                                <ShoppingBagOutlinedIcon/>
                                            </IconButton>
                                        </Badge>
                                    ) : (
                                        <IconButton size="medium" className={classes.iconSvg}>
                                            <ShoppingBagOutlinedIcon/>
                                        </IconButton>
                                    )}
                                </Link>
                            </NextLink>
                            {userInfo ? (
                                <>
                                    <Button
                                        className={classes.navbarBtn}
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={loginClickHandler}
                                    >
                                        {/*{userInfo.username}*/}
                                        <PersonOutlineOutlinedIcon/>
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
                                ):(
                                <NextLink href="/login" passHref>
                                    <Link>
                                        <IconButton size="medium" className={classes.iconSvg}>
                                            <PersonOutlineOutlinedIcon style={{fontSize: "x-large"}}/>
                                        </IconButton>
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
                <SubMenuTheme active={menuActive} setActive={setMenuActive}/>
                {/*<Demo  active={menuActive} setActive={setMenuActive}/>*/}
            </ThemeProvider>
        </div>
    );
};

export default Layout;
