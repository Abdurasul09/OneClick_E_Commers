import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Grid,
    Typography,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';

export default function ProductItem({product, addToCartHandler}) {
    // href={`/product/${product.id}`}
    return (
        <div>
            {product.map(el => (
                <Grid item md={3} key={product.id}>
                    <Card>
                        <NextLink href='#' passHref>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={el.image}
                                    title={el.name}
                                />
                                <CardContent>
                                    <Typography>{el.title}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </NextLink>
                        <CardActions>
                            <Typography>${el.price}</Typography>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => addToCartHandler(el)}
                            >
                                Add to cart
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </div>
    );
}