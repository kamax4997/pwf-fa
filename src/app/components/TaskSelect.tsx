import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useTimer from 'app/hooks/useTimer'
import { ITask } from 'utils/types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

interface ITaskSelectProps {
  setOption: (newTask: ITask | undefined) => void
  currentTask: ITask | undefined
}

const useStyles = makeStyles({
  taskSelect: {
    width: '100%',
  },
  formControl: {
    margin: 4,
    minWidth: 196,
  },
})

const TaskSelect: React.FC<ITaskSelectProps> = (props: ITaskSelectProps) => {
  const classes = useStyles()
  const { currentTask, setOption } = props
  const { tasks } = useTimer()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newTask = tasks.find((t: ITask) => t.id === event.target.value)
    setOption(newTask)
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="task-select-label">Task</InputLabel>
      <Select
        labelId="task-select-label"
        id="task-select"
        value={currentTask?.id || ''}
        onChange={handleChange}
        label="Task"
        className={classes.taskSelect}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {tasks.map((task: ITask) => <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default TaskSelect
