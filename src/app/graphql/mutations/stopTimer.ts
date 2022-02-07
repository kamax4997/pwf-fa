import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from 'app/graphql/environment'

const mutation = graphql`
  mutation stopTimerMutation($input: StartTimerecordInput) {
    stopTimerecord(input: $input) {
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

const stopTimerMutation = (taskId: string, notes: string, callback: () => void) => {
  const variables = {
    input: {
      taskid: taskId,
      notes
    },
  }

  const data = commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )

  console.log("mutation", data)
}

export default stopTimerMutation
