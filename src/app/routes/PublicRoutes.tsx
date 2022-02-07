import React, { Suspense, useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'app/components/Loading'
import Dashboard, { Dashboard_Query } from 'app/pages/dashboard'
import { useQueryLoader, PreloadFetchPolicy } from 'react-relay'
import { 
  dashboardQuery as DashboardQuery
} from 'app/pages/dashboard/__generated__/dashboardQuery.graphql'

const PublicRoutes = () => {
  const [dashboardQuery, loadDashboardQuery] = useQueryLoader<DashboardQuery>(Dashboard_Query)
  console.log("----------------", dashboardQuery, Dashboard_Query)
  const options = { fetchKey: '', fetchPolicy: 'store-and-network' as PreloadFetchPolicy }

  const refresh = useCallback(() => {
    loadDashboardQuery(options, {fetchPolicy: 'network-only'})
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" render={(props) => (
          dashboardQuery != null && 
          <Dashboard {...props} queryRef={dashboardQuery} refresh={refresh} />
        )} />
      </Switch>
    </Suspense>
  )
}

export default PublicRoutes
