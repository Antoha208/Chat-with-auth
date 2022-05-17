import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      height: '55%'
    },

    button: {
      fontSize: '1.1rem'
    }
  }));

  export default useStyles