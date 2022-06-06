import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sideBar: {
        backgroundColor: theme.palette.background.paper,
        width: '18%',
    },

    root: {
        padding: '2px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
        minHeight: '100px',
        width: '100%',
        fontSize: '1.3rem',
        padding: 0
    }

  }));

  export default useStyles