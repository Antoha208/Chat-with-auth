import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sideBar: {
      backgroundColor: theme.palette.background.paper,
      width: '18%',
  },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
    tabs: {
      borderRight: `1px solid ${theme.palette.info.main}`,
      height: 20,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      minWidth: '40%',
    },



    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      backgroundColor: '#1A1B1A',
      margin: '10px 0px 10px 7px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 40,
      margin: 4,
    },
  }));
  
  export default useStyles