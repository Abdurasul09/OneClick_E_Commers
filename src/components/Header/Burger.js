import * as React from 'react';
import {IconButton, Box} from '@material-ui/core';
import NextLink from "next/link";
import {GridMenu} from "../../../Utils/svg";
import useStyle from "../../../Utils/styles";
import {Typography} from "@material-ui/core";

export default function Burger({active, setActive}) {
    const classes = useStyle();

    return (
        <Box className={classes.flex}>
            <IconButton
                onClick={() => setActive(!active)}
                className={classes.gridMenu}
            >
                <GridMenu/>
            </IconButton>
            <NextLink href="/" passHref>
                <Typography className={classes.brand}>
                    <span className={classes.brandR}>r</span>izon
                </Typography>
            </NextLink>
        </Box>
    );
}
