import React from 'react'
import {
  Grid,Paper
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  VerifiedUser, AssignmentTurnedIn,
} from '@material-ui/icons'

import { useLazyLoadQuery, commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import useGraphql from 'app/hooks/useGraphql'
import Button from 'app/components/PWFButton'
import { ITask, ITimeRecord } from 'utils/types'
import { toast } from 'react-toastify'
import { TaskSelect, TimeEntries, TimerDisplay } from 'app/components'
import { startTimerMutation } from 'app/graphql/mutations'

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
      width: '100%',
    }
  }),
)

const Dashboard: React.FC = () => {
  const classes = useStyles()
  const { 
    isLoading, 
    isTimerOn, 
    tasks, 
    setTasks, 
    startTimer, 
    stopTimer 
  } = useGraphql()

  const [currentTask, setCurrentTask] = React.useState<ITask>()
  const [recordedTime, setRecordedTime] = React.useState(0)

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

  console.log(dashboardData, "-----------")
  
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
      stopTimer()
      toast.success('Timer Off!')
    } else {
      toast.error('Please select the task!')
    }
  }, [currentTask, setRecordedTime])

  const setTaskOption = React.useCallback((t: ITask) => {
    setCurrentTask(t)
    const index = t?.timerecords?.findIndex((timeRecord: ITimeRecord) => timeRecord?.running)
    if (index && index > -1) {
      // setRecordedTime(t?.timerecords[0]?.timespent);
    } else {
      setRecordedTime(0)
    }
    if (isTimerOn && currentTask) {
      stopTimer()
    }
  }, [currentTask, setCurrentTask, setRecordedTime, isTimerOn])

  const convertTimeSpent = (time: string): string => {
    const min = Math.floor(+time / 60)
    const sec = +time - min * 60
    const minValue = min < 10 ? `0${min}` : min
    const secValue = sec < 10 ? `0${sec}` : sec
    return `${minValue} : ${secValue}`
  }

  React.useEffect(() => {
    setTasks(dashboardData.tasks)

  }, [dashboardData])

  React.useEffect(() => {
    if (isTimerOn) {
      const myInterval = setTimeout(() => {
        setRecordedTime(recordedTime + 1)
      }, 1000)
      return () => {
        clearTimeout(myInterval)
      }
    }
  }, [isTimerOn, recordedTime, setRecordedTime])

  console.log(recordedTime)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item lg={3} md={3} xs={12}>
            <TaskSelect setOption={setTaskOption} />
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <TimerDisplay
              minutes={2}
              seconds={12}
              onTimerOn={onTimerOn}
              onTimerOff={onTimerOff} />
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <TimeEntries task={currentTask as ITask} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Dashboard
