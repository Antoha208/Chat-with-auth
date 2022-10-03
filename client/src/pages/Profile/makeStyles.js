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
      width: 355,
      height: 550,
      padding: '0 30px',
      borderRadius: '15px',
    }
  }));

  export default useStyles