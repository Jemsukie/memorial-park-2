// import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MetaTags } from '@redwoodjs/web'

import DropTab from 'src/components/DropTab'
// import Forms from 'src/components/Forms'
import FormsBox from 'src/components/Forms'
import HighChartsMap from 'src/components/HighchartsMap'
import Modals from 'src/components/Modals'
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
  const comp = <FormsBox />

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
      <MetaTags title="Dashboard" description="Userdashboard page" />

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
        {/* <Modals text={'Add Deceased'} comp={comp} /> */}

        <Modals
          buttonName={'Add Deceased'}
          text={'Add a Deceased'}
          icon={faPlus}
          comp={comp}
        />
        <DeceasedList statusFilter={tableFilter} />
        <HighChartsMap />
      </div>
    </>
  )
}

export default UserdashboardPage
