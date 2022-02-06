import React from 'react'
import {
  BrowserRouter, Switch, Router,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import PublicRoutes from 'app/routes/PublicRoutes'
import DashboardLayout from './layouts/DashboardLayout'
import 'react-toastify/dist/ReactToastify.css'

const history = createBrowserHistory()

function App(): React.ReactElement {
  return (
    <Router history={history}>
      <BrowserRouter>
        <Switch>
          <DashboardLayout>
            <PublicRoutes />
          </DashboardLayout>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </Router>
  )
}

export default App
