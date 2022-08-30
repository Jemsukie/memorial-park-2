import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import DeceasedList from 'src/components/Admin/DeceasedList'
import UserList from 'src/components/Admin/UserList'
import Cards from 'src/components/Cards'

const tabs = [
  {
    name: 'Users',
    text: '',
    filter: '',
    number: 0,
    addClassName: 'info',
  },
  {
    name: 'Filing Request',
    text: '',
    filter: 'request',
    number: 0,
    addClassName: 'warning',
  },
  {
    name: 'Deceased Files',
    text: '',
    filter: 'approved',
    number: 0,
    addClassName: 'secondary',
  },
]

const DropTab = (props) => {
  const { tabs, func } = props
  return tabs.map((tab, idx) => {
    return (
      <div className="col" key={idx}>
        <Cards
          name={tab.name}
          text={tab.text}
          number={tab.number}
          addClassName={tab.addClassName}
          func={func}
        />
      </div>
    )
  })
}

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
          <DropTab tabs={tabs} func={selectTable} />
        </div>
      </div>
      <div className="container mt-3">
        <h2>{tableName}</h2>
        <RenderTables tableFilter={tableFilter} />
      </div>
    </>
  )
}

export default AdmindashboardPage
