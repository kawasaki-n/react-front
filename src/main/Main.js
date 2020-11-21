import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Switch, Route } from 'react-router-dom';

import Inbox from '../components/Inbox'
import Index from '../components/Index'
import BookTable from '../components/BookTable'
import Add from '../components/Add'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Main() {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/Books" component={BookTable} />
                <Route path="/Add" component={Add} />
            </Switch>
        </main>
    );
}

export default Main;