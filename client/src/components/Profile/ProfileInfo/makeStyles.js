import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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