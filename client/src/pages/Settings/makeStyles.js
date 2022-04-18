import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: 25,
    },
  }));

  export default useStyles