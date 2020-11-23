import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Add() {
    const classes = useStyles();
    const [ name, setName ] = useState([]);
    const [ author, setAuthor ] = useState([]);
    const [ url, setUrl ] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("name:", name, "author", author, "url:", url);
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "author": author,
                "url": url
            })
        });
    }

    return (
        <form onSubmit={handleSubmit} className={classes.root} >
            <div>
                <TextField id="name" label="Name" required onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div>
                <TextField id="author" label="Author" onChange={(e) => {setAuthor(e.target.value)}} />
            </div>
            <div>
                <TextField id="url" label="URL" onChange={(e) => {setUrl(e.target.value)}} />
            </div>
            <div>
                <Button type="submit" variant="contained">Register</Button>
            </div>
        </form>
    );
}

export default Add;
