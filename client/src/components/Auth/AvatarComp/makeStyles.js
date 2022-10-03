import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '0px',
  },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginBottom: '8px',
      border: '3px gray solid'
    },
    text: {
      textAlign: 'center'
    }
  }))

export default useStyles