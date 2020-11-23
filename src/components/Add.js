import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(2)
    }
}));

function Add(props) {
    const classes = useStyles();
    const [ values, setValues ] = useState({
        name: '',
        author: '',
        url: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        props.history.push('/books');
    }

    return (
        <form onSubmit={handleSubmit} className={classes.root} >
            <div>
                <TextField id="name" label="Name" value={values.name} required fullWidth onChange={handleChange('name')} />
            </div>
            <div>
                <TextField id="author" label="Author" value={values.author} fullWidth onChange={handleChange('author')}  />
            </div>
            <div>
                <TextField id="url" label="URL" value={values.url} fullWidth onChange={handleChange('url')}  />
            </div>
            <div>
                <Button type="submit" variant="contained" fullWidth className={classes.button} color="primary" startIcon={<SaveIcon />}>Save</Button>
            </div>
        </form>
    );
}

export default withRouter(Add);
