import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import RecordTable from '../RecordTable'

const FIND_USERS = gql`
  query FindUsers {
    users: users {
      id
      email
      firstName
      lastName
      hashedPassword
      salt
      createdAt
      roles
      deceaseds {
        deceased {
          id
          firstName
          lastName
          dateBorn
          dateDied
          latitude
          longitude
          status
        }
      }
    }
  }
`

const columnNames = ['ID', 'Email', 'Name']
const columnProps = ['id', 'email', 'name']

const FetchFromDB = () => {
  const { data } = useQuery(FIND_USERS)

  return data || []
}

const GetUserData = () => {
  const data = FetchFromDB()
  const { users } = data

  return users || []
}

const GetResult = (getList, id) => {
  return (
    getList
      .filter((d) => {
        if (d.id === id) {
          return false
        }
        return true
      })
      .map((d) => {
        const name = `${d.firstName} ${d.lastName}`

        return {
          id: d.id,
          email: d.email,
          name,
        }
      }) || []
  )
}

const UserList = () => {
  const { currentUser } = useAuth()
  const getList = GetUserData() || []
  const getResult = GetResult(getList, currentUser.id)

  return (
    <RecordTable
      data={getResult}
      columnNames={columnNames}
      columnProps={columnProps}
    />
  )
}

export default UserList
