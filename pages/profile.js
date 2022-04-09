import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import {Card, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../Utils/styles";
import IconButton from "@mui/material/IconButton";
import {Avatar, Badge, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Box from "@mui/material/Box";
import Email from "../src/components/Profile/Email";
import Phone from "../src/components/Profile/Phone";
import ProfilePages from "../src/components/Profile/ProfilePage/ProfilePages";
import api from "../api/globalApi";

const Profile = () => {
    const classes = useStyle();
    const [user, setUser] = useState({})
    const [access, setAccess] = useState('')
    useEffect(() => {
        let token = localStorage.getItem("access");
        const parse = JSON.parse(token);
        api.get("user/" , {
            headers: {
                authorization: `Bearer ${parse}`
            }
        })
            .then(res => {
                setUser(res.data)
            })
    }, [access])


    const sendUser = () => {
        let token = localStorage.getItem("access");
        const parse = JSON.parse(token);
        api.patch("user/", {user}, {
            headers: {
                authorization: `Bearer ${parse}`
            }
        })
            .then(({data}) => setUser(data) )
    }
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Layout title="Личные данные">
            <Grid className={classes.hero}>
                <ProfilePages/>
                <Grid>
                    <Typography component="h4" variant="h4" pb={3}>
                        Личные данные
                    </Typography>
                    <Card item md={3} xs={12}>
                        <List>
                            <ListItem>
                                <Typography>
                                    <IconButton sx={{p: 0}}>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            badgeContent={
                                                <CameraAltIcon style={{width: "20px", height: "20px"}} color="primary"/>
                                            }
                                        >
                                            <Avatar alt="Travis Howard" src=""/>
                                        </Badge>
                                    </IconButton>&nbsp;
                                    {user.username}
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.profileItems}>
                                <Email
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="email"
                                    user={user}
                                />
                                <Phone
                                    handleChange={handleChange}
                                    name="phone"
                                    user={user}
                                />
                                <Typography>
                                    <Typography><strong>Дата рождения</strong></Typography>
                                    {user.birth_day}&nbsp;
                                    <IconButton size={"medium"}>
                                        <EditIcon color={"primary"} fontSize={"small"}/>
                                    </IconButton>
                                </Typography>
                                <Typography>
                                    <Typography><strong>Пароль</strong></Typography>
                                    <IconButton size={"medium"}>
                                        <EditIcon color={"primary"} fontSize={"small"}/>
                                    </IconButton>
                                </Typography>
                                <Typography>
                                    <FormControl
                                        value={user.gender}
                                        name="gender"
                                    >
                                        <Typography><strong>Пол</strong></Typography>
                                        <RadioGroup
                                            name="gender"
                                            row
                                        >
                                            <FormControlLabel
                                                label="Муж"
                                                value="Муж"
                                                control={<Radio/>}
                                            />
                                            <FormControlLabel
                                                label="Жен"
                                                value="Жен"
                                                control={<Radio/>}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>

                    <Card item md={3} xs={12} className={classes.deleteProfile}>
                        <List>
                            <ListItem>
                                <Typography><strong>Удаление личного кабинета</strong></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography className={classes.profileTypography}>Как только ваш личный кабинет будет удален, Вы автоматически выйдете из системы и больше не сможете войти в этот аккаунт.</Typography>
                            </ListItem>
                            <ListItem>
                                <Button
                                    variant="text"
                                    color={"primary"}
                                    onClick={handleOpen}
                                    size={"small"}
                                >
                                    Удаление личного кабинета
                                </Button>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box className={classes.modal}>
                                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                            Действительно хотите удалить аккаунт или нет?
                                        </Typography>
                                        <Typography pt={3}>
                                            <Button variant={"outlined"}>Да</Button>&nbsp;
                                            <Button variant={"outlined"}>Нет</Button>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>

        </Layout>
    );
};

export default Profile;