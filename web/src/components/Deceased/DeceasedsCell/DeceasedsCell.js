import { Link, routes } from '@redwoodjs/router'

import Deceaseds from 'src/components/Deceased/Deceaseds'

export const QUERY = gql`
  query FindDeceaseds {
    deceaseds {
      id
      firstName
      lastName
      dateBorn
      dateDied
      latitude
      longitude
      status
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No deceaseds yet. '}
      <Link to={routes.newDeceased()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceaseds }) => {
  return <Deceaseds deceaseds={deceaseds} />
}
