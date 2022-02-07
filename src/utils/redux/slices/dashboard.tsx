import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'utils/redux/store'
import { ITask, ITimeRecord } from 'utils/types'

interface IDashboardStates {
  isLoading: boolean
  isTimerOn: boolean
  startDate: string
  tasks: ITask[]
}

const initialState: IDashboardStates = {
  isLoading: false,
  isTimerOn: false,
  startDate: '',
  tasks: [],
}

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false
      state.isTimerOn = false
      state.startDate = ''
      state.tasks = []
    },
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    // END LOADING
    endLoading(state) {
      state.isLoading = false
    },
    // TIMER ON
    onTimerOn(state, action) {
      state.isTimerOn = true
      state.startDate = action.payload.startDate
    },
    // TIMER OFF
    onTimerOff(state, action) {
      console.log(action.payload, "-----------------")
      const newTasks = state.tasks.map((task: ITask) => {
        if (task.id === action.payload.taskId) {
          const newTask: ITask = {
            id: task.id,
            name: task.name,
            // timerecords: task?.timerecords?.push(
            //   action.payload.stopTimerecord as ITimeRecord
            // ),
            taskTotalTimespent: task.taskTotalTimespent
          }
          return newTask
        }
      })
      state.isTimerOn = false
      // state.tasks = newTasks
    },
    // SET TASKS
    setTasks(state, action) {
      state.isLoading = false
      state.tasks = action.payload.tasks
    }
  },
})

// Reducer
export default slice.reducer

export function setTasks(tasks: ITask[]) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.setTasks({
      tasks
    }))

    return true
  }
}

export function startTimer(startDate: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.onTimerOn({
      startDate
    }))

    return true
  }
}

export function stopTimer(stopTimerecord: ITimeRecord, taskId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.onTimerOff({
      stopTimerecord,
      taskId
    }))
  }
}
