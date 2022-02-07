import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import environment from 'app/graphql/environment'
import { ITimeRecord } from 'utils/types'

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

const stopTimerMutation = (
  taskId: string, 
  notes: string, 
  callback: (stopTimerecord: ITimeRecord, taskId: string) => void
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
        const stopTimerecord = response?.stopTimerecord
        callback(stopTimerecord as ITimeRecord, taskId)
      },
      onError: err => console.error(err),
    },
  )
}

export default stopTimerMutation
