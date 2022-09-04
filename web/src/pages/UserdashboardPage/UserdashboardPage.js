import { MetaTags } from '@redwoodjs/web'

import Userdashboard from 'src/components/User/Userdashboard'

const UserdashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Userdashboard page" />
      <Userdashboard />
    </>
  )
}

export default UserdashboardPage
