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
import { usePreloadedQuery, PreloadedQuery, useLazyLoadQuery } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import useTimer from 'app/hooks/useTimer'
import { ITask, ITimeRecord } from 'utils/types'
import { toast } from 'react-toastify'
import { 
  TaskSelect, 
  TimeEntries, 
  TimerDisplay, 
  NoteModal 
} from 'app/components'
import { startTimerMutation, stopTimerMutation } from 'app/graphql/mutations'
import { convertRecordedTime } from 'utils/helpers'
import { dashboardQuery } from './__generated__/dashboardQuery.graphql'

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

export const Dashboard_Query = graphql`
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
`

interface IDashboardProps {
  queryRef: PreloadedQuery<dashboardQuery>
  refresh: () => void
}

const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {
  const classes = useStyles()
  const { queryRef, refresh } = props
  const {
    isTimerOn,
    setTasks, 
    startTimer, 
    stopTimer,
    tasks
  } = useTimer()

  const [currentTask, setCurrentTask] = React.useState<ITask>()
  const [recordedTime, setRecordedTime] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  let dashboardData = queryRef && usePreloadedQuery(
    Dashboard_Query, 
    queryRef as PreloadedQuery<dashboardQuery>
  )
  
  const onTimerOn = React.useCallback(() => {
    if (currentTask) {
      try {
        startTimerMutation(
          currentTask.id, 
          '', 
          (startDate: string) => startTimer(startDate)
        )
        toast.success('Timer On!')
      } catch(error) {
        toast.error('Something went wrong!')
      }
    } else {
      toast.error('Please select the task!')
    }
  }, [currentTask])

  const onTimerOff = React.useCallback((note: string) => {
    if (currentTask) {
      try {
        stopTimerMutation(
          currentTask.id, 
          note, 
          (
            stopTimerecord: ITimeRecord, 
            taskId: string
          ) => stopTimer(stopTimerecord, taskId)
        )
        setRecordedTime(0)
        queryRef && refresh()
        toast.success('Timer Off!')
      } catch(error) {
        toast.error('Something went wrong!')
      }
    } else {
      toast.error('Please select the task!')
    }
  }, [currentTask, setRecordedTime])

  const onSelect = React.useCallback((t: ITask | undefined) => {
    setCurrentTask(t)
    if (isTimerOn && currentTask) {
      setIsOpen(true)
    }
  }, [setCurrentTask, isTimerOn])

  React.useEffect(() => {
    const tasksData = dashboardData?.tasks?.map(task => {
      return {...task} as ITask
    })
    console.log(tasksData, "effect")

    if (tasksData) setTasks(tasksData)
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

  console.log(dashboardData, tasks)

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
              setIsOpen={() => setIsOpen(true)} 
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
        handleClose={() => setIsOpen(false)}
        onTimerOff={onTimerOff} />
    </div>
  )
}

export default Dashboard
