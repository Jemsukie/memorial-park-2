// import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import DropTab from 'src/components/DropTab'
import DeceasedList from 'src/components/User/DeceasedList'
import useGetUserCount from 'src/hooks/User/useGetUserCount'

const tabs = [
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

const UserdashboardPage = () => {
  const [tableName, setTableName] = useState(tabs[0].name)

  const [tableFilter, setTableFilter] = useState('request')

  useGetUserCount()

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
      <MetaTags title="Userdashboard" description="Userdashboard page" />

      <div className="d-flex justify-content-center">
        <h1>Dashboard</h1>
      </div>

      <div className="container mt-3 d-flex justify-content-center">
        <div className="row">
          <DropTab
            tabs={tabs}
            useCounter={useGetUserCount}
            func={selectTable}
          />
        </div>
      </div>
      <div className="container mt-3">
        <h2>{tableName}</h2>
        <DeceasedList statusFilter={tableFilter} />
      </div>
    </>
  )
}

export default UserdashboardPage
