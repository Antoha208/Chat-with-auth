import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    rootTabs: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: 500,
        height: 130,
        width: '100%',
        justifyContent: 'flex-start',
    },

    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-between',
    }
  }))

  export default useStyles