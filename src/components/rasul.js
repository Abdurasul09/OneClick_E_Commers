import React, {useEffect, useState} from 'react';
import {
    Divider,
    Drawer,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import Box from "@mui/material/Box";
import {useSnackbar} from "notistack";
import api from "../../api/globalApi";
import NextLink from "next/link";
import useStyle from "../../Utils/styles";
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import {GridMenu} from "../../Utils/svg";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import Tooltip from '@mui/material/Tooltip';
import {CardActionArea, CardMedia} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Rasul = () => {

    const [sidbarVisible, setSidebarVisible] = useState(false);
    const sidebarOpenHandler = () => {
        setSidebarVisible(true);
    };
    const sidebarCloseHandler = () => {
        setSidebarVisible(false);
    };


    const [categories, setCategories] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    console.log(categories)
    const fetchCategories = async () => {
        try {
            const {data} = await api.get("categories/");
            setCategories(data);
        } catch (err) {
            enqueueSnackbar('no categories', {variant: 'error'});
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [])


    const classes = useStyle();

    return (
        <div>
            <Box
                className={classes.flex}
                position="relative"
                width={150}
            >
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={sidebarOpenHandler}
                    size={"medium"}
                    className={classes.gridMenu}
                >
                    <GridMenu/>
                </IconButton>
                <NextLink href='/' passHref>
                    <Link>
                        <Image
                            width={85}
                            src={logo} alt="img"
                        />
                    </Link>
                </NextLink>
            </Box>
            <Drawer
                anchor="left"
                open={sidbarVisible}
                onClose={sidebarCloseHandler}
            >
                <List>
                    <ListItem>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>Shopping by category</Typography>
                            <IconButton
                                aria-label="close"
                                onClick={sidebarCloseHandler}
                            >
                                <CancelIcon/>
                            </IconButton>
                        </Box>
                    </ListItem>
                    <Divider light/>
                    <div
                        className="menu"
                    >
                        <div className="menu__blur"/>
                        <div className="menu__content">
                            {categories.results?.map((item, index) => (
                                <ul className="side" key={item.id}>
                                    <li className="menu__list">
                                        <ListItem
                                            button key={item}
                                            className={classes.flex}
                                        >
                                            <div className={classes.flex}>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? (
                                                        <img
                                                            src={item.icon}
                                                            alt="icon"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.icon}
                                                            alt="icon"
                                                        />
                                                    )}
                                                </ListItemIcon>
                                                <NextLink href={`/catalog/${item.name}`}>
                                                    <a>{item.name}</a>
                                                </NextLink>
                                            </div>
                                            <ul className="menu__drop">
                                                <div className={classes.categoryChildren}>
                                                    <div>
                                                        {item.children.map(el => (
                                                            <li className={classes.flex1} key={el.id}>
                                                                <NextLink  href="">
                                                                    <a>{el.name}</a>
                                                                </NextLink>
                                                            </li>
                                                        ))}
                                                    </div>
                                                    <CardActionArea className={classes.cardActionArea}>
                                                        <CardMedia
                                                            className={classes.cardActionArea}
                                                            component="img"
                                                            image={item.photo}
                                                            title={item.name}
                                                        />
                                                    </CardActionArea>
                                                </div>
                                            </ul>
                                            <ArrowForwardIosRoundedIcon
                                                fontSize={"inherit"}
                                                color={"secondary"}
                                            />
                                        </ListItem>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>

                </List>
            </Drawer>

        </div>
    );
};

export default Rasul;