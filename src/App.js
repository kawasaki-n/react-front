import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from "react-router-dom";
import Header from './layout/Header'
import SideMenu from './layout/SideMenu'
import Main from './main/Main'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <SideMenu />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
