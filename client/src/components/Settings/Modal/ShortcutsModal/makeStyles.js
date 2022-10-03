import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '70%',
    fontSize: '1.3rem'
  },

  button: {
    fontSize: '1.1rem'
  }
}))

  export default useStyles