import React from 'react';
import Layout from "../src/components/Layout";
import ProfilePages from "../src/components/Profile/ProfilePage/ProfilePages";
import {ListItem} from "@mui/material";
import {Button, List} from "@material-ui/core";

const Purchases = () => {
    return (
        <Layout title="Покупки">
                <ProfilePages/>
            <List>
                <ListItem>
                    <Button variant="outlined">Заказы</Button>&nbsp;
                    <Button variant="outlined">Покупки</Button>&nbsp;
                    <Button variant="outlined">Возвраты</Button>&nbsp;
                    <Button variant="outlined">Оформления возврата</Button>
                </ListItem>
            </List>
        </Layout>
    );
};

export default Purchases;