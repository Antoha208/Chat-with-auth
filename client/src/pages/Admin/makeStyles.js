import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '15px',
  },

  infoContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 350,
    height: 550,
    padding: '0px 20px',
    borderRadius: '15px',
  },

  paper: {
    padding: theme.spacing(2),
    marginTop: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 20,
  },

  paperButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  }));

  export default useStyles