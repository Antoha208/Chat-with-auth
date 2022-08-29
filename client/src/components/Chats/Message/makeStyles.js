import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: '600px',
    maxHeight: '600px',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  paperAbout: {
    maxWidth: '150px',
    maxHeight: '80px'
  },

  about: {
    padding: '0 15px ',
    fontSize: '1.3rem',
  }
}))

export default useStyles