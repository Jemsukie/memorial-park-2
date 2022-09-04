import { useState } from 'react'

import DeceasedList from 'src/components/Admin/DeceasedList'
import UserList from 'src/components/Admin/UserList'
import DropTab from 'src/components/DropTab'
import HighChartsMap from 'src/components/HighchartsMap'
import useGetAdminCount from 'src/hooks/Admin/useGetAdminCount'

const tabs = [
  {
    name: 'Users',
    text: '',
    filter: 'user',
    addClassName: 'info',
  },
  {
    name: 'Admins',
    text: '',
    filter: 'admin',
    addClassName: 'success',
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
  const { tableFilter, tableIndex } = props

  if (tableIndex > 1) {
    return <DeceasedList statusFilter={tableFilter} />
  } else {
    return <UserList statusFilter={tableFilter} />
  }
}

const Admindashboard = () => {
  const [tableName, setTableName] = useState(tabs[0].name)
  const [tableFilter, setTableFilter] = useState(tabs[0].filter)
  const [tableIndex, setTableIndex] = useState(0)

  // const [loading, setLoading] = useState(false)

  const selectTable = (tableName) => {
    setTableName(tableName)
    tabs.forEach((t, idx) => {
      if (t.name === tableName) {
        setTableFilter(t.filter)
        setTableIndex(idx)
      }
    })
  }

  return (
    <>
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
        <RenderTables tableFilter={tableFilter} tableIndex={tableIndex} />
        <HighChartsMap />
      </div>
    </>
  )
}

export default Admindashboard
