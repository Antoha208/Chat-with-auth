import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(60),
    height: theme.spacing(60),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}))

export default useStyles