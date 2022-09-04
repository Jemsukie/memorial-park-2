import { MetaTags } from '@redwoodjs/web'

import Admindashboard from 'src/components/Admin/Admindashboard'

const AdmindashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Admindashboard page" />
      <Admindashboard />
    </>
  )
}

export default AdmindashboardPage
