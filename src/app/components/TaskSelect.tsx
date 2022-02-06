import React from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import useGraphql from 'app/hooks/useGraphql'
import { ITask } from 'utils/types'

interface ITaskSelectProps {
  setOption: any
}

const useStyles = makeStyles({
  taskSelect: {
    width: '100%',
  },
})

const TaskSelect: React.FC<ITaskSelectProps> = (props: ITaskSelectProps) => {
  const classes = useStyles()
  const { setOption } = props
  const { tasks } = useGraphql()

  return (
    <Autocomplete
      {...{
        options: tasks,
          getOptionLabel: (option: ITask) => option.name
      }}
      selectOnFocus
      id="combo-box-demo"
      className={classes.taskSelect}
      onChange={(event: any, newValue: any | null) => {
        setOption(newValue)
      }}
      renderInput={(params) => <TextField {...params} label="Task" />}
    />
  )
}

export default TaskSelect
