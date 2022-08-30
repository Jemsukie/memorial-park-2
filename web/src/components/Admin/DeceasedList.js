// import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import RecordTable from '../RecordTable'

const FIND_DECEASEDS = gql`
  query FindDeceaseds {
    deceaseds: deceaseds {
      id
      firstName
      lastName
      dateBorn
      dateDied
      status
      users {
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`

const columnNames = ['ID', 'Name', 'Born', 'Died']
const columnProps = ['id', 'name', 'dateBorn', 'dateDied']

const FetchFromDB = () => {
  // const { currentUser } = useAuth()
  const { data } = useQuery(FIND_DECEASEDS)

  return data || []
}

const GetDeceasedsData = () => {
  const data = FetchFromDB()
  const { deceaseds } = data

  return deceaseds || []
}

const GetResult = (getList, statusFilter) => {
  return (
    getList
      .filter((d) => {
        if (d.status === statusFilter) {
          return true
        }
        return false
      })
      .map((d) => {
        const dateBorn = new Date(d.dateBorn)
        const dateDied = new Date(d.dateDied)
        const name = `${d.firstName} ${d.lastName}`

        return {
          id: d.id,
          name,
          dateBorn: dateBorn.toDateString(),
          dateDied: dateDied.toDateString(),
          status: d.status,
        }
      }) || []
  )
}

const DeceasedList = (props) => {
  const getList = GetDeceasedsData() || ''
  const { statusFilter } = props

  const getResult = GetResult(getList, statusFilter)

  return (
    <RecordTable
      data={getResult}
      columnNames={columnNames}
      columnProps={columnProps}
    />
  )
}

export default DeceasedList
