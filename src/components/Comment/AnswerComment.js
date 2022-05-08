import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "@mui/material";
import {CircularProgress, TextField} from "@material-ui/core";
import {useState} from "react";
import Axios from "../../../api/Api";
import {useSnackbar} from "notistack";

export default function AnswerComment({comment, product}) {
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await Axios.post("/comments",
                {
                    parent: comment.id,
                    description: answer,
                    product: product.id,
                })
            setLoading(false);
            enqueueSnackbar('Oтвет успешно отправлен!', {variant: 'success'});
        }catch (e){
            console.log(e)
            setLoading(false);
            enqueueSnackbar("Error", {variant: 'error'});
        }
    }

    return (
        <div>
            <Accordion
                variant={'outlined'}
                style={{border: "none", background: "none"}}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography color='#009688'>Ответить</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={submitHandler}>
                        <div>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="Написать  ответ"
                                multiline
                                size="small"
                                rows={4}
                                variant="outlined"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="text"
                            color="secondary"
                            size="small"
                        >
                            Отправить
                            {loading && <CircularProgress/>}
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
