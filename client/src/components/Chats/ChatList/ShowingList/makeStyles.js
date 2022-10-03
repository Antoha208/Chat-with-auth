import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    }
}))

export default useStyles