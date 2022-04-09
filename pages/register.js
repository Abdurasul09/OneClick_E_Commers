import React, { useEffect} from 'react';
import Layout from "../src/components/Layout";
import {Button, Link, List, ListItem, TextField, Typography} from "@mui/material";
import useStyle from "../Utils/styles";
import NextLink from 'next/link'
import {ActionType} from "../Utils/redux/actions/types";
import {useForm, Controller} from "react-hook-form";
import {useSnackbar} from 'notistack';
import {useDispatch} from "react-redux";
import api from "../api/globalApi"
import axios from "axios";

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue
    } = useForm();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        const dataFormRegister = JSON.parse(localStorage.getItem("register"))
            setValue("name", dataFormRegister.name),
            setValue("email", dataFormRegister.email),
            setValue("password", dataFormRegister.password),
            setValue("confirmPassword", dataFormRegister.confirmPassword)
    }, [])

    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("passwords dont match", {variant: "error"})
            return;
        }
        try {
            const {data} = await api.post("registration/", {
                username: name,
                email,
                password,
                password2: confirmPassword
            })
            enqueueSnackbar(data.username + " url send in email", {variant: "success"})
            dispatch({type: ActionType.USER_LOGIN, payload: data})
            localStorage.setItem("register", JSON.stringify({name, email, password, confirmPassword}))
        } catch (err) {
            enqueueSnackbar(err.message, {variant: "error"})
        }
    }
    const classes = useStyle()

    return (
        <Layout title="Register">
            <div className={classes.loginBtn}>
                <NextLink href="#">
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                    >
                        <Typography>Назад</Typography>
                    </Button>
                </NextLink>
                <NextLink href="/">
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                    >
                        <Typography>Главная</Typography>
                    </Button>
                </NextLink>
            </div>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <Typography component="h1" variant='h1'>
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    inputProps={{type: "name"}}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name ? errors.name.type === 'minLength'
                                            ? 'Name length is more then 1'
                                            : 'Name is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="email"
                                    label="email"
                                    inputProps={{type: "email"}}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ? errors.email.type === 'pattern'
                                            ? 'Email is not valid'
                                            : 'Email is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6
                            }}
                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="password"
                                    label="password"
                                    inputProps={{type: "password"}}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? errors.password.type === 'minLength'
                                                ? 'Password length is more then 5'
                                                : 'Password is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword
                                            ? errors.confirmPassword.type === 'minLength'
                                                ? 'Confirm Password length is more than 5'
                                                : 'Confirm  Password is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                        >
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography>Already hav an account?</Typography> &nbsp;
                        <NextLink href="/login" passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};

export default Register;