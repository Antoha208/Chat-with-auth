import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sideBar: {
        backgroundColor: theme.palette.background.paper,
        width: '16%',
    },

    root: {
        padding: '2px 0px',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#1A1B1A',
        margin: '10px 0px 10px 7px',
    },

    input: {
        marginLeft: theme.spacing(1),
        marginRight: '5px',
        flex: 1,
    },

    iconButton: {
        padding: '10px',
    },

    divider: {
        height: 40,
        margin: 4,
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    rootTabs: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: 520,
        width: '100%',
        justifyContent: 'flex-start',
    },

    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: '100%',
      },

    title: {
        minWidth: '40%',
    },

  }));

  export default useStyles