import { Link, routes } from '@redwoodjs/router'

import DeceasedOfUsers from 'src/components/DeceasedOfUser/DeceasedOfUsers'

export const QUERY = gql`
  query FindDeceasedOfUsers {
    deceasedOfUsers {
      id
      userId
      deceasedId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No deceasedOfUsers yet. '}
      <Link to={routes.newDeceasedOfUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceasedOfUsers }) => {
  return <DeceasedOfUsers deceasedOfUsers={deceasedOfUsers} />
}
