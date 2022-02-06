import React from 'react'
import {
  Grid, 
  Paper, 
  Typography
} from '@material-ui/core'
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import useGraphql from 'app/hooks/useGraphql'
import { ITask } from 'utils/types'
import { toast } from 'react-toastify'
import { 
  TaskSelect, 
  TimeEntries, 
  TimerDisplay, 
  NoteModal 
} from 'app/components'
import { startTimerMutation, stopTimerMutation } from 'app/graphql/mutations'
import { convertRecordedTime } from 'utils/helpers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    timeEntries: {
      paddingTop: '0px !important'
    },
    description: {
      marginBottom: 8,
      marginLeft: 8,
      fontSize: 16
    }
  }),
)

const Dashboard: React.FC = () => {
  const classes = useStyles()
  const {
    isTimerOn,
    setTasks, 
    startTimer, 
    stopTimer 
  } = useGraphql()

  const [currentTask, setCurrentTask] = React.useState<ITask>()
  const [recordedTime, setRecordedTime] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  const dashboardData = useLazyLoadQuery<any>(
    graphql`
      query dashboardQuery {
        tasks (
          input: {
            limit: 10
            orderby: { name: asc }
            where: { 
              displaytype:{ NEQ: heading }
            }
          }
        ) {
          id
          name
          timerecords {
            id
            timespent
            startdate
            enddate
            running
            notes
            contact {
              id
              fullname
            }
          }
          timespent
        }
      }
    `, { },
  )
  
  const onTimerOn = React.useCallback(() => {
    if (currentTask) {
      setTasks(dashboardData.tasks)
      startTimerMutation(currentTask.id, '', startTimer)
      toast.success('Timer On!')
    } else {
      toast.error('Please select the task!')
    }
  }, [currentTask, dashboardData])

  const onTimerOff = React.useCallback(() => {
    if (currentTask) {
      setRecordedTime(0)
      setIsOpen(true)
      stopTimerMutation(currentTask.id, '', stopTimer)
      toast.success('Timer Off!')
    } else {
      toast.error('Please select the task!')
    }
  }, [currentTask, setRecordedTime])

  const onSelect = React.useCallback((t: ITask | undefined) => {
    setCurrentTask(t)
    if (isTimerOn && currentTask) {
      onTimerOff()
    }
  }, [setCurrentTask, isTimerOn])

  React.useEffect(() => {
    setTasks(dashboardData.tasks)
  }, [dashboardData])

  React.useEffect(() => {
    if (isTimerOn) {
      const myInterval = setInterval(() => {
        setRecordedTime(recordedTime + 1)
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  }, [isTimerOn, recordedTime, setRecordedTime])

  console.log(dashboardData)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item lg={3} md={4} xs={12}>
            <Typography 
              component="h6" 
              variant="h6" 
              className={classes.description}
            >
              Please select a task.
            </Typography>
            <TaskSelect setOption={onSelect} currentTask={currentTask} />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <TimerDisplay
              timeSpent={convertRecordedTime(recordedTime.toString())}
              onTimerOn={onTimerOn}
              onTimerOff={onTimerOff} 
            />
          </Grid>

          <Grid item lg={12} md={12} xs={12} className={classes.timeEntries}>
            <TimeEntries task={currentTask as ITask} />
          </Grid>
        </Grid>
      </Paper>
      <NoteModal
        isOpen={isOpen}
        currentTask={currentTask}
        handleClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Dashboard
