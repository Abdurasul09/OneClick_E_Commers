import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "@mui/material";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import NextLink from "next/link";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

export default function Burger({active, setActive}) {
    return (
        <Box
            sx={{display: 'flex'}}
            position="relative"
        >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setActive(!active)}
                size={"medium"}
                style={{width: "55px"}}
            >
                <GridViewRoundedIcon
                    fontSize={"medium"}
                />
            </IconButton>
            <Box
                sx={{ml: 2, mt: 1}}
                style={{width: "85px"}}
            >
                <NextLink href='/' passHref>
                    <Link>
                        <Image
                            src={logo} alt="img"
                        />
                    </Link>
                </NextLink>
            </Box>
        </Box>
    );
}
