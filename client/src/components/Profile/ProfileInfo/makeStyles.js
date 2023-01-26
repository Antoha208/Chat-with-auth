const stylesJS = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    minHeight: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paperAbout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  about: {
    padding: '0 15px ',
    fontSize: '1.3rem',
  }
})

export default stylesJS
