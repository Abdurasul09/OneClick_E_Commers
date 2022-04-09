// import React from 'react';
// import {Grid} from "@mui/material";
// import Card from "@mui/material/Card";
// import NextLink from "next/link";
// import useStyle from "../../../Utils/styles";
// import {ImageList, ImageListItem, ImageListItemBar, Typography} from "@material-ui/core";
// import IconButton from "@mui/material/IconButton";
// import StarBorderIcon from '@mui/icons-material/StarBorder';
//
//
// const shop = [
//     {
//         id: 1,
//         title: "Hello world",
//         image: 'https://expertreviews.b-cdn.net/sites/expertreviews/files/2019/03/best_flower_subscription_bloom_wild_er.jpg'
//     },
//     {
//         id: 1,
//         title: "Hello world",
//         image: 'https://inspire2aspire.co.uk/cache/images/656/countryside-1846093_1920_515cffaa34c7b727c9423a5db08aae1f.jpg'
//     },
//     {
//         id: 1,
//         title: "Hello world",
//         image: 'https://i.ebayimg.com/00/s/MTYwMFgxNDQz/z/BIUAAOSwWiBa5sHm/$_57.JPG?set_id=8800005007'
//     },
//     {id: 1, title: "Hello world", image: 'https://tscstatic.cubbon.ca/CampaignImages/t12022NewP_2_26RXHTEDDBEW6W.jpg'}
// ]
//
//
// const Shops = () => {
//     const classes = useStyle();
//     return (
//         <>
//             <Typography component="h1" variant="h1">
//                 <strong>
//                     Вам это понравится
//                 </strong>
//             </Typography>
//             <Card>
//                 <Grid container spacing={3}>
//                     {shop.map(product => (
//                         <Grid item md={3} key={product.id}>
//                             <NextLink href="#">
//                                 <ImageList
//                                     sx={{
//                                         transform: 'translateZ(0)',
//                                     }}
//                                     gap={1}
//                                 >
//                                     <ImageListItem>
//                                         <img
//                                             src={product.image}
//                                             alt={product.title}
//                                             loading="lazy"
//                                         />
//                                         <ImageListItemBar
//                                             sx={{
//                                                 background:
//                                                     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//                                                     'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//                                             }}
//                                             title={product.title}
//                                             position="top"
//                                             actionIcon={
//                                                 <IconButton
//                                                     sx={{color: 'white'}}
//                                                     aria-label={`star ${product.title}`}
//                                                 >
//                                                     <StarBorderIcon/>
//                                                 </IconButton>
//                                             }
//                                             actionPosition="left"
//                                         />
//                                     </ImageListItem>
//                                 </ImageList>
//                             </NextLink>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Card>
//         </>
//
//     );
// };
//
// export default Shops;

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {Typography} from "@mui/material";

export default function Shops() {
    return (
        <>
            <Typography component="h1" variant="h1">
                <strong>
                    Вам это понравится
                </strong>
            </Typography>
            <ImageList sx={{ width: 300, height: 250 }} cols={4} style={{width: "100%"}}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.title}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
        cols: 2,
    },
];
