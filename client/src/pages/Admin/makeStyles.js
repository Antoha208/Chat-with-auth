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
  }
  }))

  export default useStyles