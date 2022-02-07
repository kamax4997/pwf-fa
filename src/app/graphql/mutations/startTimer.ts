import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from 'app/graphql/environment'

const mutation = graphql`
  mutation startTimerMutation($input: StartTimerecordInput) {
    startTimerecord(input: $input) {
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
  }
`

const startTimerMutation = (
  taskId: string, 
  notes: string, 
  callback: (startDate: string) => void
) => {
  const variables = {
    input: {
      taskid: taskId,
      notes
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response: any) => {
        const startDate = response?.startTimerecord?.startdate
        callback(startDate)
      },
      onError: err => console.error(err),
    },
  )
}

export default startTimerMutation
