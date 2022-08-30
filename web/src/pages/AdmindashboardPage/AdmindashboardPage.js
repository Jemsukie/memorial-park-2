import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import DeceasedList from 'src/components/Admin/DeceasedList'
import UserList from 'src/components/Admin/UserList'
import DropTab from 'src/components/DropTab'
import HighChartsMap from 'src/components/HighchartsMap'
import useGetAdminCount from 'src/hooks/Admin/useGetAdminCount'

const tabs = [
  {
    name: 'Users',
    text: '',
    filter: '',
    addClassName: 'info',
  },
  {
    name: 'Filing Request',
    text: '',
    filter: 'request',
    addClassName: 'warning',
  },
  {
    name: 'Deceased Files',
    text: '',
    filter: 'approved',
    addClassName: 'secondary',
  },
]

const RenderTables = (props) => {
  const { tableFilter } = props

  if (tableFilter !== '') {
    return <DeceasedList statusFilter={tableFilter} />
  } else {
    return <UserList />
  }
}

const AdmindashboardPage = () => {
  const [tableName, setTableName] = useState(tabs[0].name)
  const [tableFilter, setTableFilter] = useState('')

  // const [loading, setLoading] = useState(false)

  const selectTable = (tableName) => {
    setTableName(tableName)
    tabs.forEach((t) => {
      if (t.name === tableName) {
        setTableFilter(t.filter)
      }
    })
  }

  return (
    <>
      <MetaTags title="Admindashboard" description="Admindashboard page" />

      <div className="d-flex justify-content-center">
        <h1>Dashboard</h1>
      </div>

      <div className="container mt-3 d-flex justify-content-center">
        <div className="row">
          <DropTab
            tabs={tabs}
            useCounter={useGetAdminCount}
            func={selectTable}
          />
        </div>
      </div>
      <div className="container mt-3">
        <h2>{tableName}</h2>
        <RenderTables tableFilter={tableFilter} />
        <HighChartsMap />
      </div>
    </>
  )
}

export default AdmindashboardPage
