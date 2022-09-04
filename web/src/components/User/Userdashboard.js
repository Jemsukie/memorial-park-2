import { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import DropTab from 'src/components/DropTab'
import Modals from 'src/components/Modals'
import DeceasedList from 'src/components/User/DeceasedList'
import useGetUserCount from 'src/hooks/User/useGetUserCount'

import AddFormsBox from './AddFormsBox'

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

const Userdashboard = () => {
  const [tableName, setTableName] = useState(tabs[0].name)

  const [tableFilter, setTableFilter] = useState('request')
  const comp = <AddFormsBox />

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
          text={'Add a Deceased'}
          icon={faPlus}
          comp={comp}
          variant={'success'}
        />
        <DeceasedList statusFilter={tableFilter} />
      </div>
    </>
  )
}

export default Userdashboard
