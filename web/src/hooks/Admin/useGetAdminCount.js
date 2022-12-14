import { useQuery } from '@redwoodjs/web'

const FIND_USERS_BY_ROLE_COUNT = gql`
  query FindUsersByRoleCount($roles: String!) {
    usersByRoleCount: usersByRoleCount(roles: $roles)
  }
`

const FIND_DECEASED_BY_STATUS_COUNT = gql`
  query FindDeceasedByStatusCount($status: String!) {
    deceasedByStatusCount: deceasedByStatusCount(status: $status)
  }
`

const FetchUsers = () => {
  const { data } = useQuery(FIND_USERS_BY_ROLE_COUNT, {
    variables: { roles: 'user' },
  })

  return data || ''
}

const FetchAdmins = () => {
  const { data } = useQuery(FIND_USERS_BY_ROLE_COUNT, {
    variables: { roles: 'admin' },
  })

  return data || ''
}

const FetchDeceasedRequest = () => {
  const { data } = useQuery(FIND_DECEASED_BY_STATUS_COUNT, {
    variables: { status: 'request' },
  })

  return data || ''
}

const FetchDeceasedApproved = () => {
  const { data } = useQuery(FIND_DECEASED_BY_STATUS_COUNT, {
    variables: { status: 'approved' },
  })

  return data || ''
}

const FetchAll = () => {
  const request = FetchDeceasedRequest()
  const approved = FetchDeceasedApproved()
  const users = FetchUsers()
  const admins = FetchAdmins()
  const loading = 'Loading...'

  return [
    users ? users.usersByRoleCount : loading,
    admins ? admins.usersByRoleCount - 1 : loading,
    request ? request.deceasedByStatusCount : loading,
    approved ? approved.deceasedByStatusCount : loading,
  ]
}

const GetValue = () => {
  return FetchAll()
}

const useGetAdminCount = () => {
  // const [result, setResult] = useState(0)
  const getCount = GetValue() || 0

  return getCount
}

export default useGetAdminCount
