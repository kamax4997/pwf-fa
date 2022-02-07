import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'app/components/Loading'
import Dashboard, { Dashboard_Query } from 'app/pages/dashboard'
import { useQueryLoader } from 'react-relay'
import { 
  dashboardQuery as DashboardQuery
} from 'app/pages/dashboard/__generated__/dashboardQuery.graphql'

const PublicRoutes = () => {
  const [dashboardQuery, loadDashboardQuery] = useQueryLoader<DashboardQuery>(Dashboard_Query)

  useEffect(() => {
    loadDashboardQuery({fetchPolicy: 'network-only'})
  }, [])

  const refresh = useCallback(() => {
    loadDashboardQuery({fetchPolicy: 'network-only'})
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" render={(props) => (
          dashboardQuery && <Dashboard
           {...props} 
           queryRef={dashboardQuery} 
           refresh={refresh}
          />
        )} />
      </Switch>
    </Suspense>
  )
}

export default PublicRoutes
