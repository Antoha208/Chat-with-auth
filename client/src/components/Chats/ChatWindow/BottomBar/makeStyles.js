import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '95%',
      margin: '15px 0px 10px 7px',
    },

    input: {
      display: 'none',
      marginLeft: theme.spacing(1),
      flex: 1,
    },

    iconButton: {
      padding: 10,
    },

    divider: {
      height: 40,
      margin: 4,
    },
    
  }));

  export default useStyles