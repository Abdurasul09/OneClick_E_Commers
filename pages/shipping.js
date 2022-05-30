import React from 'react';
import Layout from "../src/components/Layout";
import {Button, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyle from "../Utils/styles";
import {ActionType} from "../Utils/redux/actions/types";
import {useRouter} from "next/router";
import {useForm, Controller} from "react-hook-form";
import CheckoutWizard from "../src/components/ChekoutWizard/ChekoutWizard";
import {useDispatch} from "react-redux";
import Buttons from "../src/components/Buttons/Buttons";

const Shipping = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();


    const router = useRouter();
    const dispatch = useDispatch()

    const submitHandler = ({fullName, address, city, postalCode, country}) => {
        dispatch({
            type: ActionType.SAVE_SHIPPING_ADDRESS,
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        })
        localStorage.setItem("shippingAddress", JSON.stringify({fullName, address, city, postalCode, country}))
        router.push("/payment")
    }


    const classes = useStyle()

    return (
        <Layout title="Shipping">
           <Buttons/>
            <CheckoutWizard activeStep={1}/>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <Typography component="h4" variant='h4'>
                    Aдресa Доставки
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName
                                        ? errors.fullName.type === 'minLength'
                                            ? 'Full Name length is more then 1'
                                            : 'Full Name is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    error={Boolean(errors.address)}
                                    helperText={errors.address
                                        ? errors.address.type === 'minLength'
                                            ? 'Address length is more then 1'
                                            : 'Address is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="city"
                                    label="City"
                                    error={Boolean(errors.city)}
                                    helperText={errors.city
                                        ? errors.city.type === 'minLength'
                                            ? 'City length is more then 1'
                                            : 'City is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="postalCode"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="postalCode"
                                    label="Postal Code"
                                    error={Boolean(errors.postalCode)}
                                    helperText={errors.postalCode
                                        ? errors.postalCode.type === 'minLength'
                                            ? 'Postal Code length is more then 1'
                                            : 'Postal Code is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    error={Boolean(errors.country)}
                                    helperText={errors.country
                                        ? errors.country.type === 'minLength'
                                            ? 'Country length is more then 1'
                                            : 'Country Name is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                        >
                            Продолжать
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};

export default Shipping;