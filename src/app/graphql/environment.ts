import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'
import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode'
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'
import config from 'app/config'

async function fetchGraphQL(params: RequestParameters, variables: Variables) {
  try {
    const response = await fetch(config.graphql as any, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY as any,
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
})
