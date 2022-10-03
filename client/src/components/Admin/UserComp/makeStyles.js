import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      borderBottom: '1px solid gray',
    }
  }))

  export default useStyles