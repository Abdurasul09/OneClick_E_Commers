import React from 'react';
import {Typography} from "@mui/material";
import {Link} from "@material-ui/core";
import NextLink from "next/link";
import useStyle from "../Utils/styles";

const Newcollection = () => {
    const classes = useStyle();
    return (
        <div>
            <NextLink href="#" passHref>
                <Link>
                    <Typography
                        className={classes.brand}
                        py={2}
                    >
                        Новинки
                    </Typography>
                </Link>
            </NextLink>
        </div>
    );
};

export default Newcollection;