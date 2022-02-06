import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'app/components/Loading'
import Dashboard from 'app/pages/dashboard'

const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Suspense>
  )
}

export default PublicRoutes
