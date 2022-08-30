import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

const FIND_USER = gql`
  query FindUser($id: Int!) {
    user: user(id: $id) {
      deceaseds {
        deceased {
          id
          status
        }
      }
    }
  }
`

const FetchFromDB = () => {
  const { currentUser } = useAuth()
  const { data } = useQuery(FIND_USER, {
    variables: { id: currentUser.id },
  })

  return data || []
}

const FetchUser = () => {
  const { user } = FetchFromDB()

  return user || []
}

const FetchDeceaseds = () => {
  const { deceaseds } = FetchUser()

  return deceaseds || []
}

const FetchAll = () => {
  const result = FetchDeceaseds()

  return result.map((r) => {
    return r.deceased
  })
}

const GetValue = () => {
  const result = FetchAll()
  const request = result.filter((r) => {
    if (r.status === 'request') {
      return true
    }
  })
  const approved = result.filter((r) => {
    if (r.status === 'approved') {
      return true
    }
  })

  return [request.length || 0, approved.length || 0]
}

const useGetUserCount = () => {
  // const [result, setResult] = useState(0)
  const getCount = GetValue() || []

  return getCount
}

export default useGetUserCount
