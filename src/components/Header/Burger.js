import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {Link} from "@mui/material";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import NextLink from "next/link";
import {GridMenu} from "../../../Utils/svg";
import useStyle from "../../../Utils/styles";

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
            <Box
                sx={{ml: 2, mt: 1}}
            >
                <NextLink href='/' passHref>
                    <Link>
                        <Image
                            width={85}
                            src={logo} alt="img"
                        />
                    </Link>
                </NextLink>
            </Box>
        </Box>
    );
}
