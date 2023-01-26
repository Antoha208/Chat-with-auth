const stylesJS = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection: 'column',
  },

  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  
  avatarContainer: {
    borderRadius: '50%',
  },

  input: {
    display: 'none',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default stylesJS
