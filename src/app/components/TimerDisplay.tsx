import React from 'react'
import {
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
import useTimer from 'app/hooks/useTimer'

interface ITimerDisplayProps {
    timeSpent: string
    onTimerOn: () => void
    setIsOpen: () => void
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
  const { timeSpent, onTimerOn, setIsOpen } = props
  const { isTimerOn, stopTimer } = useTimer()

  const onStop = () => {
    setIsOpen()
    stopTimer()
  }

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
            aria-label="start" 
            disabled={isTimerOn} 
            onClick={onTimerOn}
          >
            <PlayArrowIcon className={classes.controlButton} />
          </IconButton>
          <IconButton 
            aria-label="stop" 
            disabled={!isTimerOn} 
            onClick={onStop}
          >
            <StopIcon className={classes.controlButton} />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={PWFCogsIntegration}
        title="PWFCogsIntegration"
      />
    </Card>
  )
}

export default TimerDisplay
