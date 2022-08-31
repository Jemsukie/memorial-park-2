import Deceased from 'src/components/Deceased/Deceased'

export const QUERY = gql`
  query FindDeceasedById($id: Int!) {
    deceased: deceased(id: $id) {
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

export const Empty = () => <div>Deceased not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceased }) => {
  return <Deceased deceased={deceased} />
}
