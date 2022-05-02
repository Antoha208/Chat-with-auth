import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      flexDirection: 'column',
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    input: {
      display: 'none',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  }));

export default useStyles