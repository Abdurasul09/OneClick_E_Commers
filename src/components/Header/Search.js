import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useStyle from "../../../Utils/styles";
import {useRouter} from "next/router";
import {Box} from "@mui/material";


const Search = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const queryChangeHandler = (e) => {
        setQuery(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search?query=${query}`);
    };
    const classes = useStyle();
    return (
        <Box
            className={classes.searchSection}
        >
            <form onSubmit={submitHandler} className={classes.searchForm}>
                <input
                    name="query"
                    className={classes.searchInput}
                    placeholder="Search..."
                    onChange={queryChangeHandler}
                />
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                >
                    <SearchIcon/>
                </IconButton>
            </form>
        </Box>
    );
};

export default Search;