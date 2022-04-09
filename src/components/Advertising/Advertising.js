import React from 'react';
import Slider from "react-slick";
import {List} from "@material-ui/core";
import {Button, Grid, ListItem, Typography} from "@mui/material";
const Advertising = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: Boolean,
    };
    const adversitings = [
        {
            id: 1,
            img: 'https://images.asics.com/is/image/asics/1012B060_401_SR_RT_GLB?$product$&fmt=png-alpha',
            title: "50% Off Four Your First Shopping",
            description: "Lorem ipsum dolor sit amet, spernatur atque mollitia nam nobis quaerat recusandae? A ad assumenda delectus dolor est explicabo libero nemo quo sequi vel."
        },
        {
            id: 2,
            img: 'https://cdn.shopify.com/s/files/1/2974/2654/products/adidas_tshirt_beige_ae1b57ee-e8ad-4f9a-8390-7bf3ece801c0_900x.png?v=1613499517',
            title: "50% Off Four Your First Shopping",
            description: "Lorem ipsum dolor sit amet, ur atque mollitia nam nobis quaerat recusandae? A ad assumenda delectus dolor est explicabo libero nemo quo sequi vel."

        }
    ]
    return (
        <section className='advertising'>
            <div className="container">
                <div className="advertising__content">
                        <Slider {...settings}>
                            {adversitings.map(item => (
                                <Grid  spacing={1} key={item.id}>
                                    <Grid container item xs={12}>
                                        <List>
                                            <ListItem>
                                                <Grid md={1} xs={12}/>
                                                <Grid md={5} xs={12}>
                                                    <Typography pt={8} pb={5}>
                                                        <Typography component="h1" variant="h1" fontSize={"xxx-large"}>{item.title}</Typography>
                                                        <Typography fontSize={"small"}>{item.description}</Typography>
                                                    </Typography>
                                                    <Button variant="contained" color={"primary"}>SHOPPING NOW</Button>
                                                </Grid>
                                                <Grid md={1} xs={12}/>
                                                <Grid md={4} xs={12}>
                                                    <img
                                                        src={item.img}
                                                        alt="image"
                                                        width={40}
                                                        height={450}
                                                    />
                                                </Grid>

                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            ))}
                        </Slider>
                    {/*<div className="advertising__content__img">*/}
                    {/*    <img*/}
                    {/*        src='https://s3.amazonaws.com/nikeinc/assets/71686/170620_FOOTWEAR_AM90_NAVY_0169_hd_1600.jpg?1499341109'*/}
                    {/*        alt="image"*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
};

export default Advertising;