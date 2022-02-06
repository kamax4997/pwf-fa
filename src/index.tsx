import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import { RelayEnvironmentProvider } from 'react-relay'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import environment from 'app/graphql/environment'
import { store, persistor } from 'utils/redux/store'
import Loading from 'app/components/Loading'
import reportWebVitals from './reportWebVitals'
import 'assets/styles/style.scss'

ReactDOM.render(
  <RelayEnvironmentProvider environment={environment}>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </RelayEnvironmentProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
