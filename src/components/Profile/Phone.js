import React from 'react';
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {Button, Modal, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import useStyle from "../../../Utils/styles";

const Phone  = ({user,handleChange, sendUser}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyle();

    return (
        <div>
            <Typography>
                <Typography> <strong>Телефон</strong></Typography>
                {user.phone}&nbsp;
                <IconButton size={"medium"}>
                    <EditIcon
                        color={"primary"}
                        fontSize={"small"}
                        onClick={handleOpen}
                    />
                </IconButton>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box className={classes.modal}>
                        <form>
                            <Typography
                                id="keep-mounted-modal-title"
                                variant="h6" component="h2"
                                pb={2}
                            >
                                Изменение номера телефона
                            </Typography>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                value={user.phone}
                                name="phone"
                                label="Phone"
                                id="outlined-size-small"
                                size="small"
                                inputProps={{type: "phone"}}
                            />

                            <Typography pt={3}>
                                <Button
                                    variant={"outlined"}
                                    onClick={sendUser ? handleClose : ''}
                                >
                                    Сохранить
                                </Button>&nbsp;
                                <Button variant={"outlined"}>Отменить</Button>
                            </Typography>
                        </form>
                    </Box>
                </Modal>
            </Typography>
        </div>
    );
};

export default Phone;