import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {Link} from "@mui/material";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import NextLink from "next/link";
import {GridMenu} from "../../../Utils/svg";
import useStyle from "../../../Utils/styles";
import {Typography} from "@material-ui/core";

export default function Burger({active, setActive}) {
    const classes = useStyle();

    return (
        <Box
            className={classes.flex}
            position="relative"
            width={150}
        >
            <IconButton
                aria-label="open drawer"
                onClick={() => setActive(!active)}
                size={"medium"}
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
