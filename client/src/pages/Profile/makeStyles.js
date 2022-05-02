import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    upBar: {
      backgroundColor: '#1049A9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    avatarContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A1B1A',
      flexDirection: 'column',
      borderRadius: '15px',
      minWidth: '410px',
      minHeight: '550px',
    },

    infoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A1B1A',
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

    button: {
      padding: 0,
      margin: 0,
    },

    about: {
      padding: '0 15px ',
      fontSize: '1.3rem',
    },

    paperSmall: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 50,
    },
  }));

  export default useStyles