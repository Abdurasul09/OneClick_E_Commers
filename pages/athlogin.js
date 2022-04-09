// import React, {useContext, useEffect} from 'react';
// import Layout from "../src/components/Layout";
// import {Button, Link, List, ListItem, TextField, Typography} from "@mui/material";
// import useStyle from "../Utils/styles";
// import NextLink from 'next/link'
// import {ActionType} from "../Utils/redux/actions/types";
// import {useRouter} from "next/router";
// import {Store} from "../Utils/redux/Store";
// import {useForm, Controller} from "react-hook-form";
// import {useSnackbar} from 'notistack';
// import axios from "axios";
//
// const Athlogin = () => {
//     const {
//         handleSubmit,
//         control,
//         formState: {errors},
//     } = useForm();
//     console.log("erlan")
//     const {enqueueSnackbar, closeSnackbar} = useSnackbar();
//     const router = useRouter();
//     const {token} = router.query
//     // console.log(token)
//     const {state, dispatch} = useContext(Store);
//     const {userInfo} = state;
//
//     useEffect(() => {
//         if (userInfo) {
//             router.push('/')
//         }
//     }, [])
//     const submitHandler = async () => {
//         closeSnackbar();
//         try {
//             const response = await axios.get(`https://oneclickback.herokuapp.com/verify-email/${token}`)
//
//             const {data} = response
//             console.log("responce:", response)
//             console.log("data:", data)
//             dispatch({type: ActionType.USER_LOGIN, payload: response})
//             localStorage.setItem("access", JSON.stringify(response.access))
//             localStorage.setItem("refresh", JSON.stringify(response.refresh))
//             router.push( '/');
//
//         } catch (err) {
//             enqueueSnackbar(err.message, {variant: "error"})
//         }
//     }
//     const classes = useStyle()
//     return (
//         <Layout title="Athlogin">
//             <div className={classes.loginBtn}>
//                 <NextLink href="#">
//                     <Button
//                         className={classes.btn}
//                         variant="contained"
//                         color="primary"
//                     >
//                         <Typography>Назад</Typography>
//                     </Button>
//                 </NextLink>
//                 <NextLink href="/">
//                     <Button
//                         className={classes.btn}
//                         variant="contained"
//                         color="primary"
//                     >
//                         <Typography>Главная</Typography>
//                     </Button>
//                 </NextLink>
//             </div>
//
//             <form
//                 className={classes.form}
//                 onSubmit={handleSubmit(submitHandler)}
//             >
//                 <Typography component="h1" variant='h1'>
//                     Athlogin
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <Controller
//                             name="email"
//                             control={control}
//                             defaultValue=""
//                             rules={{
//                                 required: true,
//                                 pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
//                             }}
//
//                             render={({field}) =>
//                                 <TextField
//                                     variant="outlined"
//                                     fullWidth
//                                     id="email"
//                                     label="email"
//                                     inputProps={{type: "email"}}
//                                     error={Boolean(errors.email)}
//                                     helperText={errors.email ? errors.email.type === 'pattern'
//                                             ? 'Email is not valid'
//                                             : 'Email is required'
//                                         : ''
//                                     }
//                                     {...field}
//                                 />
//                             }
//
//                         />
//
//                     </ListItem>
//                     <ListItem>
//                         <Controller
//                             name="password"
//                             control={control}
//                             defaultValue=""
//                             rules={{
//                                 required: true,
//                                 minLength: 6
//                             }}
//                             render={({field}) =>
//                                 <TextField
//                                     className={classes.textField}
//                                     label="password"
//                                     variant="outlined"
//                                     fullWidth
//                                     id="password"
//                                     inputProps={{type: "password"}}
//                                     error={Boolean(errors.password)}
//                                     helperText={
//                                         errors.password
//                                             ? errors.password.type === 'minLength'
//                                                 ? 'Password length is more then 5'
//                                                 : 'Password is required'
//                                             : ''
//                                     }
//                                     {...field}
//                                 />
//                             }
//                         />
//                     </ListItem>
//                     <ListItem>
//                         <Button
//                             variant="contained"
//                             type="submit"
//                             fullWidth
//                             color="primary"
//                         >
//                             Athlogin
//                         </Button>
//                     </ListItem>
//                     <ListItem>
//                         <Typography>Dont have an account ?</Typography>&nbsp;
//                         <NextLink href="/register" passHref>
//                             <Link>Register</Link>
//                         </NextLink>
//                     </ListItem>
//                 </List>
//             </form>
//         </Layout>
//     );
// };
//
//
// export default Athlogin;