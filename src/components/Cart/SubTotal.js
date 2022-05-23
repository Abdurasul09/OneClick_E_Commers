import React from 'react';
import {List} from "@material-ui/core";
import {Button, Card, ListItem, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const SubTotal = ({cart}) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const router = useRouter();
    const checkoutHandler = () => {
        if(userInfo) {
            router.push("/checkout")
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
                        <button
                            style={{width: '100%'}}
                            className='btnCart'
                            onClick={checkoutHandler}
                        >
                            Проверить
                        </button>
                    </ListItem>
                </List>
            </Card>
        </div>
    );
};

export default SubTotal;