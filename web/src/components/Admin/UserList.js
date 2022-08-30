import { useQuery } from '@redwoodjs/web'

import RecordTable from '../RecordTable'

const FIND_USERS_BY_ROLE = gql`
  query FindUsersByRole($roles: String!) {
    usersByRole: usersByRole(roles: $roles) {
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
  const { data } = useQuery(FIND_USERS_BY_ROLE, {
    variables: { roles: 'user' },
  })

  return data || []
}

const GetUserData = () => {
  const data = FetchFromDB()
  const { usersByRole } = data

  return usersByRole || []
}

const GetResult = (getList) => {
  return (
    getList.map((d) => {
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
  const getList = GetUserData() || []
  const getResult = GetResult(getList)

  return (
    <RecordTable
      data={getResult}
      columnNames={columnNames}
      columnProps={columnProps}
    />
  )
}

export default UserList
