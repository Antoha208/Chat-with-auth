import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 20,
  },

  paperButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  }))

  export default useStyles