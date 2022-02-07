import { useSelector, useDispatch } from 'react-redux'
import { setTasks, startTimer, stopTimer } from 'utils/redux/slices/dashboard'
import { IRootState } from 'utils/redux/store'
import { ITask } from 'utils/types'

const useTimer = () => {
  const dispatch = useDispatch()

  const {
    isLoading, isTimerOn, tasks, startDate
  } = useSelector(
    (state: IRootState) => state.dashboard,
  )

  return {
    isLoading,
    isTimerOn,
    tasks,
    startDate,

    setTasks: (params: ITask[]) => dispatch(
      setTasks(params),
    ),
    startTimer: (startDate: string) => dispatch(
      startTimer(startDate)
    ),
    stopTimer: () => dispatch(stopTimer()),
  }
}

export default useTimer
