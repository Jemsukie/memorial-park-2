import { Button } from 'react-bootstrap'

import { useAuth } from '@redwoodjs/auth'
import { useQuery, useMutation } from '@redwoodjs/web'

import Modals from '../Modals'
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

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser: updateUser(id: $id, input: $input) {
      id
    }
  }
`
const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser: deleteUser(id: $id) {
      id
    }
  }
`

const FIND_DECEASED_OF_USERS_BY_USER = gql`
  query FindDeceasedOfUsersByUser($userId: Int!) {
    deceasedOfUsersByUser: deceasedOfUsersByUser(userId: $userId) {
      id
    }
  }
`

const DELETE_DECEASED_OF_USER_MUTATION = gql`
  mutation DeleteDeceasedOfUserMutation($id: Int!) {
    deleteDeceasedOfUser(id: $id) {
      id
    }
  }
`

const FetchDeceasedOfUsers = (userId) => {
  const { data } = useQuery(FIND_DECEASED_OF_USERS_BY_USER, {
    variables: { userId },
  })

  return data || []
}

const GetByUsers = (id) => {
  const data = FetchDeceasedOfUsers(id)
  const { deceasedOfUsersByUser } = data

  return deceasedOfUsersByUser || []
}

const FetchFromDB = (roles) => {
  const { data } = useQuery(FIND_USERS_BY_ROLE, {
    variables: { roles },
  })

  return data || []
}

const GetUserData = (statusFilter) => {
  const data = FetchFromDB(statusFilter)
  const { usersByRole } = data

  return usersByRole || []
}

const GetResult = (getList) => {
  const { currentUser } = useAuth()
  return (
    getList
      .map((d) => {
        const name = `${d.firstName} ${d.lastName}`

        return {
          id: d.id,
          email: d.email,
          name,
        }
      })
      .filter((d) => {
        if (d.id !== currentUser.id) {
          return true
        }
        return false
      }) || []
  )
}

const UserList = (props) => {
  // Let's modify the column structure for user and admin
  const columnStructure = {
    user: {
      names: ['ID', 'Email', 'Name', 'Actions'],
      props: [
        'id',
        'email',
        'name',
        (props) => {
          const { id } = props
          return (
            <>
              <Modals
                variant={'success'}
                text={'Make Admin'}
                icon={''}
                comp={<MakeAdminAccount id={id} />}
              />
              <Modals
                variant={'danger'}
                text={'Delete'}
                icon={''}
                comp={<DeleteUserAccount id={id} />}
              />
            </>
          )
        },
      ],
    },
    admin: {
      names: ['ID', 'Email', 'Name'],
      props: ['id', 'email', 'name'],
    },
  }

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      window.alert('Account Updated!')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    },
    onError: (error) => {
      window.alert(error.message)
    },
  })

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      window.alert('Account Deleted!')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    },
    onError: (error) => {
      window.alert(error.message)
    },
  })

  const [deleteDeceasedOfUser] = useMutation(DELETE_DECEASED_OF_USER_MUTATION)

  const MakeAdminAccount = (props) => {
    const { id } = props

    const updateThis = () => {
      updateUser({
        variables: {
          id,
          input: {
            roles: 'admin',
          },
        },
      })
    }

    return (
      <>
        <p>Are you sure to make this user an admin?</p>
        <Button className="mx-1" variant="success" onClick={updateThis}>
          Confirm
        </Button>
      </>
    )
  }

  const DeleteUserAccount = (props) => {
    const { id } = props

    const list = GetByUsers(id)

    const DeleteThis = () => {
      list.forEach((l) => {
        deleteDeceasedOfUser({ variables: { id: l.id } })
      })

      // We need to implement delete on DeceasedOfUser first
      //
      deleteUser({
        variables: {
          id,
        },
      })
    }

    return (
      <>
        <p>Are you sure to delete this user?</p>
        <Button className="mx-1" variant="danger" onClick={DeleteThis}>
          Confirm Delete
        </Button>
      </>
    )
  }

  const { statusFilter } = props
  const getList = GetUserData(statusFilter) || []
  const getResult = GetResult(getList)

  return (
    <RecordTable
      data={getResult}
      columnNames={columnStructure[statusFilter].names}
      columnProps={columnStructure[statusFilter].props}
    />
  )
}

export default UserList
