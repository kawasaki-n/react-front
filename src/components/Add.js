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

function regist(e) {

}

function Add() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField id="name" label="Name" />
            </div>
            <div>
                <TextField id="auther" label="Auther" />
            </div>
            <div>
                <TextField id="url" label="URL" />
            </div>
            <div>
                <Button onClick={ regist } variant="contained" href="/Books">Register</Button>
            </div>
        </form>
    );
}

export default Add;
