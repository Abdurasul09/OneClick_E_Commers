import React, {useEffect, useState} from 'react';
import {Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import Box from "@mui/material/Box";
import {useSnackbar} from "notistack";
import api from "../../api/globalApi";
import NextLink from "next/link";
import useStyle from "../../Utils/styles";
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

const Rasul = () => {

    const [sidbarVisible, setSidebarVisible] = useState(false);
    const sidebarOpenHandler = () => {
        setSidebarVisible(true);
    };
    const sidebarCloseHandler = () => {
        setSidebarVisible(false);
    };


    const [categories, setCategories] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    console.log(categories)
    const fetchCategories = async () => {
        try {
            const { data } = await api.get("categories/");
            setCategories(data);
        } catch (err) {
            enqueueSnackbar('no categories', { variant: 'error' });
        }
    };

    useEffect(() => {
        fetchCategories();
    },[])



    const classes = useStyle();

    return (
        <div>
            <Box display="flex" alignItems="center">
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={sidebarOpenHandler}
                    className={classes.menuButton}
                >
                    <MenuIcon className={classes.navbarButton} />
                </IconButton>
                <NextLink href="/" passHref>
                    <Link>
                        <Typography className={classes.brand}>OneClick</Typography>
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
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                    <Divider light />
                    <div>
                        <div>
                            {categories.results?.map((category) => (
                                <NextLink
                                    key={category}
                                    href={`/search?category=${category}`}
                                    passHref
                                >
                                    <ListItem
                                        button
                                        component="a"
                                        onClick={sidebarCloseHandler}
                                    >
                                        <ListItemText primary={category.name}/>
                                    </ListItem>
                                </NextLink>
                            ))}
                        </div>
                    </div>
                </List>
            </Drawer>

        </div>
    );
};

export default Rasul;