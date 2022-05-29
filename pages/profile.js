import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import {Card, Grid, List, ListItem, Typography} from "@mui/material";
import useStyle from "../Utils/styles";
import IconButton from "@mui/material/IconButton";
import {Avatar, Badge, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import Email from "../src/components/Profile/Email";
import Phone from "../src/components/Profile/Phone";
import ProfilePages from "../src/components/Profile/ProfilePage/ProfilePages";
import api from "../api/globalApi";
import Axios from "../api/Api";
import Born from "../src/components/Profile/born";
import Name from "../src/components/Profile/name";

const Profile = () => {
    const classes = useStyle();
    const [user, setUser] = useState({})
    // const [changeAvatar, setChangeAvatar] = useState({})
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        e.preventDefault();
        let readerBackground = new FileReader();
        let fileBackground = e.target.files[0];
        readerBackground.onloadend = () => {
            setFile(fileBackground);
            setImagePreview(readerBackground.result);
        };
        readerBackground.readAsDataURL(fileBackground);
    };

    useEffect(() => {
        const parse = JSON.parse(localStorage.getItem("access"));
        api.get("user/", {
            headers: {authorization: `Bearer ${parse}`}
        })
            .then(res => setUser(res.data))
    }, [])

    const sendUser = async () => {
        const form = new FormData();
        form.append("avatar", comment)

        try {
            await Axios.patch("user/", {user})
                .then((data) => setUser(data))
        } catch (e) {
            console.log(e)
        }
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
                                <Grid item xl={12} md={1}>
                                    <Avatar src={imagePreview ? imagePreview : null} alt="Travis Howard" />
                                    <ListItem>
                                        <label className="input-file">
                                            <input
                                                type="file"
                                                id="profile_pic"
                                                name="profile_pic"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => handleImageChange(e)}
                                                className="fileInput"
                                            />
                                            Добавить фото
                                        </label>
                                    </ListItem>
                                </Grid>
                                <Grid item xl={12} md={1}>
                                    <Name
                                        sendUser={sendUser}
                                        handleChange={handleChange}
                                        name="name"
                                        user={user}
                                    />
                                </Grid>
                            </ListItem>
                            <ListItem className={classes.profileItems}>
                                <Email
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="email"
                                    user={user}
                                />
                                <Phone
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="phone"
                                    user={user}
                                />
                                <Born
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="phone"
                                    user={user}
                                />
                                <Typography>
                                    <Typography>
                                        <strong>Пароль</strong>
                                    </Typography>
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
                                                label={user.gender}
                                                value={user.gender ? user.gender : ''}
                                                control={<Radio/>}
                                            />
                                            <FormControlLabel
                                                label={user.gender}
                                                value={user.gender}
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
                                <Typography className={classes.profileTypography}>Как только ваш личный кабинет будет
                                    удален, Вы автоматически выйдете из системы и больше не сможете войти в этот
                                    аккаунт.</Typography>
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
                                        <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>
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