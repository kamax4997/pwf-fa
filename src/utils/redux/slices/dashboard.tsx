import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'utils/redux/store'
import { ITask } from 'utils/types'

const initialState = {
  isLoading: false,
  isTimerOn: false,
  isError: false,
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
      state.isError = false
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
    onTimerOn(state) {
      state.isTimerOn = true
    },
    // TIMER OFF
    onTimerOff(state) {
      state.isTimerOn = false
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

export function startTimer() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.onTimerOn())

    return true
  }
}

export function stopTimer() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.onTimerOff())
  }
}
