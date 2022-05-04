import React, {useEffect, useState} from 'react';
import {Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import Box from "@mui/material/Box";
import api from "../../api/globalApi";
import {useSnackbar} from "notistack";
import NextLink from 'next/link'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SubMenuTheme = () => {
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
            const { data } = await api.get(`/categories`);
            setCategories(data);
        } catch (err) {
            enqueueSnackbar('not category', { variant: 'error' });
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);


    return (
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
                            <CloseRoundedIcon/>
                        </IconButton>
                    </Box>
                </ListItem>
                <Divider light />
                {categories.results?.map( category => (
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
                            <ListItemText primary={category.womens}/>
                        </ListItem>
                    </NextLink>
                ))}
            </List>
        </Drawer>
    );
};

export default SubMenuTheme;



