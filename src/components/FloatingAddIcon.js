import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
}));

function FloatingAddIcon() {
    const classes = useStyles();

    return(
        <Fab className={classes.fab} color="primary" href={"/Add"}>
            <AddIcon />
        </Fab>
    );
}

export default FloatingAddIcon;