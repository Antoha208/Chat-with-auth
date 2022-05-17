import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: 400,
      maxHeight: 400,
      backgroundColor: theme.palette.background.paper,
      padding: '2px 0px',
      overflow: 'hidden',
    },

    listItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      borderBottom: '1px solid gray',
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
    
    iconButton: {
      padding: 10,
    },
  }));

  export default useStyles