import React from 'react';
import api from "../api/globalApi";
import {Grid, List, ListItem} from "@material-ui/core";
import { YMaps } from 'react-yandex-maps';

const Issuepoint = (locations) => {
    console.log(locations)
    return (
        <div>
            <List>
                <ListItem>
                    <Grid item xs={12} md={4}>
                        <YMaps>
                            <div>My awesome application with maps!</div>
                        </YMaps>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {locations.results?.map(el => (
                            <div key={el.id}>
                                <ymaps
                                    width={el.lon}
                                    height={el.lat}
                                >
                                    Ваш браузер не поддерживает плавающие фреймы!
                                </ymaps>
                            </div>
                        ))}
                    </Grid>
                </ListItem>
            </List>
        </div>
    );
};

export default Issuepoint;
export async function getServerSideProps() {
    const res = await api.get(`/locations`)
    const locations = await res.data
    return {props: {locations}}
}