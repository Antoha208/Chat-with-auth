import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      //flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
      //height: 700,
      // marginTop: 100,
      // marginBottom: 100,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    selectedChat: {
      marginLeft: '10%',
    }
  }));

  export default useStyles