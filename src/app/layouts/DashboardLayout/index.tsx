import React from 'react'
import Header from 'app/components/Header'

const DashboardLayout: React.FC = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
)

export default DashboardLayout
