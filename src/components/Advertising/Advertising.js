import {useEffect, useState} from 'react';
import Slider from "react-slick";
import api from "../../../api/globalApi";
import Card from "@mui/material/Card";
import NextLink from "next/link";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";

const Advertising = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: Boolean,
    };

    const [abc, setAbc] = useState([])
    useEffect(() => {
        api('/abc')
            .then(res => setAbc(res.data))
    },[])
    return (
        <section className='advertising'>
            <div className="container">
                <div className="advertising__content">
                    <Slider {...settings}>
                        {abc.results?.map(el => (
                            // <div key={el.id}>
                            //     <img src={el.photo} alt="img" className='bannerImg'/>
                            // </div>
                            <div className="hover12 column">
                                <div>
                                    <figure><img src={el.photo}/></figure>
                                </div>
                            </div>

                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Advertising;
