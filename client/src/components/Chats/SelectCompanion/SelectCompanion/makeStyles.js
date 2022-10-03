import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      padding: '2px 0px',
      overflowX: 'hidden'
    },

    inputWrap: {
      display: 'flex',
      width: '97%',
      backgroundColor: '#1A1B1A',
      margin: '2px 5px',
    },

    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    
    button: {
      width: '100%',
    },

    iconButton: {
      padding: 10,
    }
  }))

  export default useStyles