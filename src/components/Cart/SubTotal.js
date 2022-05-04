import React from 'react';
import {List} from "@material-ui/core";
import {Button, Card, ListItem, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const SubTotal = ({cart}) => {
    const {userInfo} = useSelector(state => state.user)
    const router = useRouter();

    const checkoutHandler = () => {
        if(!userInfo) {
            router.push("/shipping")
        } else {
            router.push("/login")
        }
    }
    return (
        <div>
            <Card>
                <List>
                    <ListItem>
                        <Typography variant="h2">
                            Общая сумма ({cart?.reduce((a, c) => a + c.quantity, 0)} {''}
                            товары) :  {''}
                            {cart?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1)} coм
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={checkoutHandler}
                        >
                            Проверить
                        </Button>
                    </ListItem>
                </List>
            </Card>
        </div>
    );
};

export default SubTotal;