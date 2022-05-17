import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatarContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: '15px',
      minWidth: '410px',
      minHeight: '550px',
    },

    infoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 350,
      height: 550,
      padding: '0 30px',
      borderRadius: '15px',
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.primary,
      minHeight: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    paperAbout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },

    about: {
      padding: '0 15px ',
      fontSize: '1.3rem',
    }
  }));

  export default useStyles