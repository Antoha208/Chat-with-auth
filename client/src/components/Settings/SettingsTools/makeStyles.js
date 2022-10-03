import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: 25,
      maxHeight: 40,
    }
  }))

  export default useStyles