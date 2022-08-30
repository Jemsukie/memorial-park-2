// import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const UserdashboardPage = () => {
  return (
    <>
      <MetaTags title="Userdashboard" description="Userdashboard page" />

      <h1>Dashboard</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/UserdashboardPage/UserdashboardPage.js</code>
      </p>
      <p>
        My default route is named <code>userdashboard</code>, link to me with `
        <Link to={routes.userdashboard()}>Userdashboard</Link>`
      </p>
    </>
  )
}

export default UserdashboardPage
