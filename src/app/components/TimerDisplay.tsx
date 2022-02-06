import React from 'react'
import { 
  withStyles, 
  Theme, 
  createStyles, 
  makeStyles
} from '@material-ui/core/styles'
import { 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton, 
  Typography
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import PWFCogsIntegration from 'assets/images/PWF-cogs-integration.png'
import useGraphql from 'app/hooks/useGraphql'

interface ITimerDisplayProps {
    timeSpent: string
    onTimerOn: () => void
    onTimerOff: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 'fit-content',
      textAlign: 'center',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 96,
      paddingRight: 32,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
    },
    controlButton: {
      height: 25,
      width: 25,
    },
  }),
)

const TimerDisplay: React.FC<ITimerDisplayProps> = (props: ITimerDisplayProps) => {
  const classes = useStyles()
  const { timeSpent, onTimerOn, onTimerOff } = props
  const { isTimerOn } = useGraphql()

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {timeSpent}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton 
            aria-label="play/pause" 
            disabled={isTimerOn} 
            onClick={onTimerOn}
          >
            <PlayArrowIcon className={classes.controlButton} />
          </IconButton>
          <IconButton 
            aria-label="next" 
            disabled={!isTimerOn} 
            onClick={onTimerOff}
          >
            <StopIcon className={classes.controlButton} />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={PWFCogsIntegration}
        title="Live from space album cover"
      />
    </Card>
  )
}

export default TimerDisplay
