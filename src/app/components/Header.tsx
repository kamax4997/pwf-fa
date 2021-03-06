import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appName: {
      marginRight: theme.spacing(2),
    },
    companyName: {
      flexGrow: 1,
    },
  }),
)

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.companyName}>
            ProWorkflow
          </Typography>
          <Typography variant="h6" className={classes.appName}>
            Time Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
